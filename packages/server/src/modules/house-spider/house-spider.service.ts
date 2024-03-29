import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { AxiosRequestConfig } from 'axios';
import { City, House, Role, Subway, User } from '@xf/common/src/entities';
import { DEFAULT_CITY_ID } from '@xf/common/src/constants/city.const';
import { DEFAULT_ROLE } from '@xf/common/src/constants/roles.const';
import { DEFAULT_USER_PASSWORD } from '@xf/common/src/constants/user.const';
import { CronService } from '@/common/cron/cron.service';
import { AttachmentService } from '@/modules/attachment/attachment.service';
import { request, createRangeRandom } from '@/utils';
import { parseHouseHtml, createBid } from './util';
import { WxPushService } from '@/common/wx-push/wx-push.service';
import { ConfigService } from '@/common/config/config.service';
import { SystemService } from '@/common/system/system.service';
// import { ProxyService } from '@/common/proxy/proxy.service';

export interface IDoubanGroupTopic {
  title: string;
  tid: string;
  username: string;
  updateAt: string;
}

/**
 * 豆瓣小组爬虫策略
 * 1. 先获取 5 页列表 5 * 30 = 150 条
 * 2. 将这 5 页的数据信息存到内存中
 */

@Injectable()
export class HouseSpiderService extends CronService {
  /**
   * cron 任务名
   *
   * @static
   * @memberof HouseSpiderService
   */
  static readonly cronJobName = 'douban-spider';

  /**
   * 豆瓣小组每页个数
   *
   * @static
   * @memberof HouseSpiderService
   */
  static readonly pagePerCount = 25;

  /**
   * 豆瓣小组广州地址前缀
   *
   * @static
   * @memberof HouseSpiderService
   */
  static readonly groupListUrl = 'https://www.douban.com/group/gz020/discussion?start=';

  /**
   * 豆瓣小组话题前缀
   *
   * @static
   * @memberof HouseSpiderService
   */
  static readonly topicUrl = 'https://www.douban.com/group/topic/';

  /**
   * logger
   *
   * @protected
   * @memberof HouseSpiderService
   */
  protected readonly logger = new Logger(HouseSpiderService.name);

  /**
   * 爬取错误次数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private fetchErrorCount = 0;

  /**
   * 当前请求次数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private fetchCount = 0;

  /**
   * 待爬取的豆瓣话题列表
   *
   * @private
   * @type {IFetchDoubanItem}
   * @memberof HouseSpiderService
   */
  private pendingFetchList: IDoubanGroupTopic[] = [];

  constructor(
    protected readonly schedulerRegistry: SchedulerRegistry,
    private readonly attachmentService: AttachmentService, // private readonly proxyService: ProxyService,
    private readonly wxPushService: WxPushService,
    private readonly configService: ConfigService,
    private readonly systemService: SystemService,
  ) {
    super(schedulerRegistry);
  }

  /**
   * 爬取的当前页数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private pageNum = 0;

  /**
   * 爬取列表次数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private fetchListTimes = 1;

  /**
   * 当前爬取过的房源数据 {tid: <houseData>}
   *
   * @private
   * @memberof HouseSpiderService
   */
  private houseDataMap = new Map<string, IDoubanGroupTopic>();

  /**
   * 是否被禁
   *
   * @private
   * @memberof HouseSpiderService
   */
  private wasBanned = false;

  /**
   * 开始爬虫
   *
   * @memberof HouseSpiderService
   */
  public startCronJob() {
    const cronJob = this.addCronJob(
      HouseSpiderService.cronJobName,
      this.configService.SPIDER_CRON_JOB,
      () => {
        if (this.wasBanned) {
          return;
        }

        this.resetData();

        // 创建代理池
        // this.proxyService.createProxyPool().then(() => {
        this.fetchList().then(() => {
          // 爬取详情
          this.fetchDetail();
        });
        // });
      },
    );
    cronJob.start();
  }

  /**
   * 豆瓣爬虫请求封装
   *
   * @private
   * @param {AxiosRequestConfig} options
   * @returns
   * @memberof HouseSpiderService
   */
  private request(options: AxiosRequestConfig) {
    const bid = createBid();
    if (!options.headers) {
      options.headers = { Cookie: bid };
    } else {
      options.headers.Cookie = bid;
    }
    return request(options);
  }

  /**
   * 爬取列表
   *
   * @private
   * @returns
   * @memberof HouseSpiderService
   */
  private fetchList() {
    // 延迟爬取下一列表
    const fetchNextList = (resolve: any) => {
      const time = createRangeRandom(10, 30);
      // this.logger.log(`${time}s后开始获取下一列表`);

      setTimeout(() => {
        handler(resolve);
      }, time * 1000);
    };

    const handler = (resolve: any) => {
      const url = HouseSpiderService.groupListUrl + this.pageNum * HouseSpiderService.pagePerCount;
      this.logger.log(`[获取列表] 当前列表页数为: ${this.pageNum}, 请求数为 ${this.fetchCount}`);
      // 爬取次数 +1
      this.fetchCount++;

      // this.proxyService
      this.request({ url })
        .then((res: any) => {
          // 不合法退出
          if (this.checkResIsUnValid(res)) {
            this.wasBanned = true;
            return resolve();
          }
          this.parseListData(res);

          const nextMaxPage = this.configService.SPIDER_PRE_FETCH_PAGE_COUNT * this.fetchListTimes;
          // 当前页数没达到每次需爬取的数量时
          // 继续爬取下一页
          if (this.pageNum < nextMaxPage) {
            this.pageNum++;
            fetchNextList(resolve);
          } else {
            this.logger.log(`已结束获取列表, 下一页为${this.pageNum + 1}`);
            this.fetchListTimes++;
            return resolve();
          }
        })
        .catch((err) => {
          // 爬取列表失败超过最大次数，则跳过去爬取详情
          if (this.fetchErrorCount > this.configService.SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON) {
            const msg = `获取豆瓣小组列表失败超过最大错误次数${this.fetchErrorCount}`;
            this.logger.error(msg);
            this.configService.IS_PROD && this.wxPushService.send(msg);
            return resolve();
          }
          this.logger.error(
            `获取豆瓣小组列表失败, 次数:${this.fetchErrorCount}, 地址:${url}, ${err.message}`,
          );
          this.fetchErrorCount++;
          // 重新请求列表
          fetchNextList(resolve);
        });
    };

    return new Promise((resolve) => {
      handler(resolve);
    });
  }

  /**
   * 解析列表中有用的数据 标题 时间 tid 等
   *
   * @private
   * @param {string} html
   * @returns {IDoubanGroupTopic[]}
   * @memberof HouseSpiderService
   */
  private parseListData(html: string): void {
    let successParsedCount = 0;
    let skipParsedCount = 0;
    const curYear = new Date().getFullYear();
    const $ = cheerio.load(html);
    const $trs = $('table.olt tr');

    for (let i = 1; i < $trs.length; i++) {
      const el = $trs[i];
      const item: IDoubanGroupTopic = {} as IDoubanGroupTopic;
      const $tds = $(el).children('td');
      // 标题
      const $titleTd = $tds.eq(0);
      const $a = $titleTd.children('a');
      item.title = $a.attr('title') || '';

      // 配置了排除关键字
      if (this.checkKeywordExclude(item.title)) {
        skipParsedCount++;
        continue;
      }

      // 如果配置了只爬取关键词
      // 则标题没有关键词会跳过
      if (!this.checkKeywordInclude(item.title)) {
        skipParsedCount++;
        continue;
      }

      // tid
      item.tid = $a.attr('href')!.match(/[1-9]\d*/)![0];

      // 作者
      const $userTd = $tds.eq(1);
      item.username = $userTd.text().trim();

      // 时间
      const $timeTd = $tds.eq(3);
      item.updateAt = `${curYear}-${$timeTd.text()}:00`;

      // 加入 pending 列表中
      if (!this.houseDataMap.has(item.tid)) {
        successParsedCount++;
        this.houseDataMap.set(item.tid, item);
        this.pendingFetchList.push(item);
      }
    }
    this.logger.log(`列表解析成功${successParsedCount}条, 跳过${skipParsedCount}条`);
  }

  /**
   * 递归列表中的数据爬取详情中的数据
   *
   * @private
   * @returns
   * @memberof HouseSpiderService
   */
  private fetchDetail(): Promise<void> {
    if (this.wasBanned) {
      return Promise.resolve();
    }

    this.logger.log(`开始爬取详情, 共${this.pendingFetchList.length}条`);

    // 延迟爬取下一详情
    const fetchNextDetail = (resolve: any) => {
      const time = createRangeRandom(10, 30);
      // this.logger.log(`${time}s后开始获取下一详情`);

      setTimeout(() => {
        handler(resolve);
      }, time * 1000);
    };

    const handler = (resolve: any) => {
      // 超过最大爬取数则结束爬取
      if (this.fetchCount < this.configService.SPIDER_MAX_FETCH_IN_CRON) {
        // 队列中还存在未爬取数据
        if (this.pendingFetchList.length) {
          const firstItem = this.pendingFetchList.shift()!;
          const { tid } = firstItem;
          const url = HouseSpiderService.topicUrl + tid;
          this.logger.log(`[获取详情] tid: ${tid}, 请求数为 ${this.fetchCount}`);

          // 爬取次数 +1
          this.fetchCount++;
          // this.proxyService
          this.request({ url })
            .then((res: any) => {
              // 不合法退出
              if (this.checkResIsUnValid(res, true)) {
                this.wasBanned = true;
                return resolve();
              }
              this.parseDetailData(res, tid)
                .then((reason) => {
                  // 解析出来若结果为 null 说明有信息丢失(地铁名没有解析到/已存在数据库中)
                  // 跳过继续爬取下一条
                  if (reason) {
                    this.logger.log(`已跳过房源保存, ${url}, 原因: ${reason}`);
                  } else {
                    this.logger.log(`保存房源成功豆瓣话题成功, tid:${tid}`);
                  }

                  fetchNextDetail(resolve);
                })
                .catch((err) => {
                  this.logger.error(`解析豆瓣话题失败, 地址:${url}, ${err.message}`);
                  // 失败则跳过爬取下一条
                  fetchNextDetail(resolve);
                  // 把失败的加入到队尾
                  // this.pendingFetchList.push(firstItem);
                });
            })
            .catch((err) => {
              if (this.fetchErrorCount > this.configService.SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON) {
                const msg = `已超过获取详情失败最大次数${this.configService.SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON}`;
                this.logger.error(msg);
                this.configService.IS_PROD && this.wxPushService.send(msg);
                resolve();
              } else {
                this.fetchErrorCount++;
                this.logger.error(`获取豆瓣话题失败, 地址:${url}, ${err.message}`);
                // 失败则跳过爬取下一条
                fetchNextDetail(resolve);
                // 把失败的加入到队尾
                // this.pendingFetchList.push(firstItem);
              }
            });
        } else {
          this.logger.log('列表中已无数据!');
          resolve();
          this.shouldFetchMore();
        }
      } else {
        const info = `已请求${this.configService.SPIDER_MAX_FETCH_IN_CRON}次，等待下一次获取`;
        this.logger.log(info);
        if (this.configService.IS_PROD) {
          this.wxPushService.send(info);
        }
        resolve();
      }
    };

    return new Promise((resolve) => {
      handler(resolve);
    });
  }

  /**
   * 解析详情中有用的数据
   *
   * @private
   * @param {string} html
   * @returns
   * @memberof HouseSpiderService
   */
  private async parseDetailData(html: string, tid: string) {
    // 列表中的保存的用户名和标题
    const { username, title, updateAt } = this.houseDataMap.get(tid)!;

    // 获取连接并创建新的queryRunner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // 使用我们的新queryRunner建立真正的数据库连接
    await queryRunner.connect();
    // 开始事务
    await queryRunner.startTransaction();

    try {
      // 如果已经存在数据库了 直接跳过
      const dbHouse = await queryRunner.manager.findOne(House, { where: { tid } });
      if (dbHouse) {
        this.logger.log(`已经存在数据库中 tid 为 ${tid}`);
        // await queryRunner.release();
        return Promise.resolve('已经存在数据库中');
      }

      const $ = cheerio.load(html);
      const text = $('#link-report .topic-richtext').text().trim();
      const cTime = $('#content h3 .color-green').text();
      // const userface = $('.user-face img').attr('src')!;

      const { house: parsedHouse, user, subwayName, keywords } = parseHouseHtml(
        text,
        title,
        this.configService.SPIDER_KEYWORD_TO_PUSH ? this.configService.SPIDER_KEYWORD_INCLUDE : [],
      );

      // 推送到微信
      if (keywords.length) {
        const link = HouseSpiderService.topicUrl + tid;
        this.wxPushService.send(
          `有${keywords.join('/')}的新房子啦`,
          `- Title: ${title}
           - Price: ${parsedHouse.price}
           - Link: [${link}](${link})`,
        );
      }

      parsedHouse.content = text;
      parsedHouse.createdAt = new Date(cTime);
      parsedHouse.updatedAt = new Date(updateAt);

      // 目前写死为广州
      parsedHouse.city = await queryRunner.manager.findOneOrFail(City, {
        id: DEFAULT_CITY_ID,
      });
      // 地铁名
      if (subwayName) {
        parsedHouse.subway = await queryRunner.manager.findOneOrFail(Subway, {
          name: subwayName,
          cityId: DEFAULT_CITY_ID,
        });
      } else {
        return Promise.resolve('解析地铁名失败');
      }

      // 图片
      const $imgs = $('#link-report img');
      let imgArr: string[] = [];

      if ($imgs.length) {
        $imgs.each((_, el) => {
          imgArr.push($(el).attr('src')!);
        });
        parsedHouse.imgs = imgArr.join(',');
      }
      // 只保存 9 张图
      imgArr = imgArr.slice(0, 9);

      // 标题和 tid
      parsedHouse.title = title;
      parsedHouse.tid = +tid;

      // 是否在数据库中存在
      const dbUser = await queryRunner.manager.findOne(User, {
        relations: ['houses'],
        where: {
          username,
        },
      });

      if (dbUser) {
        // 上传图片
        const imgs = await this.attachmentService.uploadImgs2OSS(imgArr, dbUser.id, 'house');
        parsedHouse.imgs = imgs.join(',');
        parsedHouse.user = dbUser;
        parsedHouse.user!.houses.push(parsedHouse as House);
        // 更新数据库房子数据
        await queryRunner.manager.save(User, parsedHouse.user);
        await queryRunner.manager.save(House, parsedHouse);
      } else {
        // 创建默认密码为 123456
        const password = DEFAULT_USER_PASSWORD;
        // 创建用户
        const defaultRoles = await queryRunner.manager.find(Role, { token: DEFAULT_ROLE });
        const newUser = await queryRunner.manager.save(User, {
          ...user,
          username,
          password,
          // 设置默认头像
          avatar: 'logo.png',
          roles: defaultRoles,
          houses: [parsedHouse as House],
        });
        parsedHouse.user = newUser as User;
        // 上传图片
        const imgs = await this.attachmentService.uploadImgs2OSS(imgArr, newUser.id!, 'house');
        parsedHouse.imgs = imgs.join(',');

        // 创建房子
        await queryRunner.manager.save(House, parsedHouse);
      }

      // 提交事务
      await queryRunner.commitTransaction();
      return void 0;
    } catch (err) {
      console.log(err);
      this.logger.error('保存房源事务失败，即将回滚', err);
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      return Promise.reject(err);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  /**
   * 是否需要爬取过多
   *
   * @private
   * @memberof HouseSpiderService
   */
  private shouldFetchMore(): Promise<any> {
    if (this.wasBanned) {
      return Promise.resolve();
    }

    // 没有达到本次请求数
    if (this.fetchCount < this.configService.SPIDER_MAX_FETCH_IN_CRON) {
      // 继续下一次请求
      return this.fetchList().then(() => {
        return this.fetchDetail();
      });
    }

    return Promise.resolve();
  }

  /**
   * 检测返回数据是否有效
   *
   * @private
   * @param {string} res
   * @param {boolean} shouldPush 是否微信推送
   * @returns
   * @memberof HouseSpiderService
   */
  private checkResIsUnValid(res: string, shouldPush = false) {
    const unValid = /https\:\/\/sec.douban.com/.test(res);
    const msg = '已被 ban !';
    if (unValid) {
      this.logger.error(msg);
      // 修改配置文件设置为关闭
      this.configService.modifyConfig('SPIDER_IS_OPEN_HOUSE', 0).then(() => {
        // 重启服务
        this.systemService.reloadServer();
      });
      if (shouldPush) {
        this.wxPushService.send(msg);
      }
    }

    return unValid;
  }

  /**
   * 检测标题含有关键词
   *
   * @private
   * @param {string} title
   * @returns
   * @memberof HouseSpiderService
   */
  private checkKeywordInclude(title: string) {
    let include = false;
    if (
      this.configService.SPIDER_ONLY_FETCH_WITH_KEYWORD &&
      this.configService.SPIDER_KEYWORD_INCLUDE.length
    ) {
      const toGetKeywords = this.configService.SPIDER_KEYWORD_INCLUDE;
      include = toGetKeywords.some((keyword) => title.includes(keyword));
    }

    return include;
  }

  /**
   * 检测标题不含关键词
   *
   * @private
   * @param {string} title
   * @returns
   * @memberof HouseSpiderService
   */
  private checkKeywordExclude(title: string) {
    let hasExcludeKeyword = false;
    if (this.configService.SPIDER_KEYWORD_EXCLUDE.length) {
      const toGetKeywords = this.configService.SPIDER_KEYWORD_EXCLUDE;
      hasExcludeKeyword = toGetKeywords.some((keyword) => title.includes(keyword));
    }

    return hasExcludeKeyword;
  }

  /**
   * 重置爬取基础数据
   *
   * @memberof HouseSpiderService
   */
  private resetData() {
    this.pageNum = 0;
    this.fetchCount = 0;
    this.fetchListTimes = 0;
    this.fetchErrorCount = 0;
  }
}
