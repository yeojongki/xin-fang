import { Injectable, Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { City, House, Subway, User } from '@xf/common/src/entities';
import { DEFAULT_CITY_ID } from '@xf/common/src/constants/city.const';
import { request, createRangeRandom } from '@/utils';
import { CronService } from '@/common/cron/cron.service';
import { parseHouseHtml, createUserAgent } from './util';

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
  protected readonly logger = new Logger(HouseSpiderService.name);
  /**
   * 错误次数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private errorsCount = 0;

  /**
   * 当前爬取的数量
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

  constructor(protected readonly schedulerRegistry: SchedulerRegistry) {
    super(schedulerRegistry);
  }

  /**
   * 每次爬取的房源最大爬取数
   *
   * @static
   * @memberof HouseSpiderService
   */
  static maxFetchCount = process.env.NODE_ENV === 'development' ? 1 : Infinity;

  /**
   * cron 任务名
   *
   * @static
   * @memberof HouseSpiderService
   */
  static cronJobName = 'douban-spider';

  /**
   * cron 表达式
   *
   * @static
   * @memberof HouseSpiderService
   */
  static CronExpression = '0 0 9-23 * * *';

  /**
   * 每次爬取列表的数量
   *
   * @static
   * @memberof HouseSpiderService
   */
  static everyTimeGetPageNum = process.env.NODE_ENV === 'development' ? 1 : 10;

  /**
   * 最大爬取列表失败次数
   *
   * @static
   * @memberof HouseSpiderService
   */
  static maxErrorListCount = 5;

  /**
   * 豆瓣小组广州地址前缀
   *
   * @static
   * @memberof HouseSpiderService
   */
  static groupListUrl = 'https://www.douban.com/group/gz020/discussion?start=';

  /**
   * 豆瓣小组话题前缀
   *
   * @static
   * @memberof HouseSpiderService
   */
  static topicUrl = 'https://www.douban.com/group/topic/';

  /**
   * 爬取的当前页数
   *
   * @private
   * @memberof HouseSpiderService
   */
  private pageNum = 0;

  /**
   * 当前爬取过的房源数据 {tid: <houseData>}
   *
   * @private
   * @memberof HouseSpiderService
   */
  private houseDataMap = new Map<string, IDoubanGroupTopic>();

  public startCronJob(expression: string | Date = HouseSpiderService.CronExpression) {
    const cronJob = this.addCronJob(HouseSpiderService.cronJobName, expression, () => {
      this.fetchList().then(() => {
        // 爬取详情
        this.fetchDetail();
      });
    });
    cronJob.start();
  }

  /**
   * 爬取列表
   *
   * @private
   * @returns
   * @memberof HouseSpiderService
   */
  private fetchList() {
    this.logger.log('开始获取豆瓣小组出租列表');

    const handler = (resolve: any) => {
      // 1 - 7 秒后爬取下一列表
      const fetchNextList = () => {
        setTimeout(() => {
          handler(resolve);
        }, createRangeRandom(1, 7) * 1000);
      };

      const url = HouseSpiderService.groupListUrl + this.pageNum * 25;
      request
        .get<any, string>(url, createUserAgent())
        .then((res) => {
          this.pageNum++;
          this.parseListData(res);

          // 当前页数没达到每次需爬取的数量时
          // 继续爬取下一页
          if (this.pageNum < HouseSpiderService.everyTimeGetPageNum) {
            fetchNextList();
          } else {
            this.logger.log(
              `本次共获取${HouseSpiderService.everyTimeGetPageNum}页豆瓣小组出租列表`,
            );
            resolve();
          }
        })
        .catch((err) => {
          // 爬取列表失败超过最大次数，则跳过去爬取详情
          if (this.errorsCount > HouseSpiderService.maxErrorListCount) {
            this.logger.error(`获取豆瓣小组列表失败超过最大错误次数${this.errorsCount}`);
            // 重置错误为 0
            this.errorsCount = 0;
            return resolve();
          }
          this.logger.error(
            `获取豆瓣小组列表失败, 次数:${this.errorsCount}, 地址:${url}, ${err.message}`,
          );
          this.errorsCount++;
          // 重新请求列表
          fetchNextList();
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
      // 不获取含有 `求租` 关键字的帖子
      if (item.title.includes('求租')) {
        break;
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
        this.houseDataMap.set(item.tid, item);
        this.pendingFetchList.push(item);
      }
    }
  }

  /**
   * 递归列表中的数据爬取详情中的数据
   *
   * @private
   * @returns
   * @memberof HouseSpiderService
   */
  private fetchDetail(): Promise<void> {
    this.logger.log('开始获取豆瓣小组出租详情');

    const handler = (resolve: any) => {
      // 5 - 10 秒后爬取下一详情
      const fetchNextDetail = () => {
        setTimeout(() => {
          handler(resolve);
        }, createRangeRandom(5, 10) * 1000);
      };

      // 超过最大爬取数则结束爬取
      if (this.fetchCount < HouseSpiderService.maxFetchCount) {
        // 队列中还存在未爬取数据
        if (this.pendingFetchList.length) {
          const firstItem = this.pendingFetchList.shift()!;
          const url = HouseSpiderService.topicUrl + firstItem.tid;
          request
            .get<any, string>(url, createUserAgent())
            .then((res) => {
              this.parseDetailData(res, firstItem.tid)
                .then(() => {
                  this.logger.log(`保存房源成功豆瓣话题成功, tid:${firstItem.tid}`);
                  this.fetchCount++;
                  fetchNextDetail();
                })
                .catch((err) => {
                  this.logger.error(`解析豆瓣话题失败, 地址:${url}, ${err.message}`);
                  // 失败则跳过爬取下一条
                  fetchNextDetail();
                  // 把失败的加入到队尾
                  this.pendingFetchList.push(firstItem);
                });
            })
            .catch((err) => {
              this.logger.error(`获取豆瓣话题失败, 地址:${url}, ${err.message}`);
              // 失败则跳过爬取下一条
              fetchNextDetail();
              // 把失败的加入到队尾
              this.pendingFetchList.push(firstItem);
            });
        } else {
          resolve();
        }
      } else {
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
        await queryRunner.release();
        return Promise.resolve();
      }

      const $ = cheerio.load(html);
      const text = $('#link-report .topic-richtext').text().trim();
      const cTime = $('#content h3 .color-green').text();
      const userface = $('.user-face img').attr('src')!;

      const { house: parsedHouse, user, subwayName } = parseHouseHtml(text);
      parsedHouse.content = text;
      parsedHouse.createdAt = new Date(cTime);
      parsedHouse.updatedAt = new Date();

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
      }

      // 图片
      const $imgs = $('#link-report img');
      if ($imgs.length) {
        const imgArr: string[] = [];
        $imgs.each((_, el) => {
          imgArr.push($(el).attr('src')!);
        });
        parsedHouse.imgs = imgArr.join(',');
      }

      const { username, title } = this.houseDataMap.get(tid)!;
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
        parsedHouse.user = dbUser;
        parsedHouse.user!.houses.push(parsedHouse as House);
        // 更新数据库房子数据
        await queryRunner.manager.save(House, parsedHouse);
      } else {
        // 创建默认密码为 123456
        const password = 'e10adc3949ba59abbe56e057f20f883e';
        // 创建用户
        const newUser = await queryRunner.manager.save(User, {
          ...user,
          username,
          password,
          avatar: userface,
          houses: [parsedHouse as House],
        });
        parsedHouse.user = newUser as User;
        // 创建房子
        await queryRunner.manager.save(House, parsedHouse);
      }

      // 提交事务
      await queryRunner.commitTransaction();
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
}
