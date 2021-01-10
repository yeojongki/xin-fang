import { RequestOptions, getRandomUserAgent } from '@/utils';
import { Injectable, Logger } from '@nestjs/common';
// import cheerio = require('cheerio');
import fs = require('fs-extra');
import { getRandom } from '@xf/common/src/utils';
import { proxyRequest } from '@/utils';
import { ConfigService } from '../config/config.service';

export interface IpItem {
  host: string;
  port: string;
}

@Injectable()
export class ProxyService {
  private proxyPool: IpItem[] = [];
  private checkUrl = 'https://www.ip.cn/';
  private logger = new Logger(ProxyService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * 使用代理池中的请求
   *
   * @param {RequestOptions} options
   * @returns
   * @memberof ProxyService
   */
  public request(options: RequestOptions) {
    const len = this.proxyPool.length;
    if (len) {
      const index = getRandom(0, len - 1);
      const { host, port } = this.proxyPool[index];
      this.logger.log(`本次请求配置为 -> host:${host} port:${port}`);
      options.proxy = this.createProxyStr(host, port);
      if (!options.headers) {
        options.headers = this.createUserAgent().headers;
      }
      return proxyRequest(options);
    } else {
      return this.createProxyPool().then(() => this.request(options));
    }
  }

  /**
   * TODO 创建连接池
   *
   * @param {number} [count=this.configService.PROXY_POOL_COUNT]
   * @returns {Promise<void>}
   * @memberof ProxyService
   */
  public async createProxyPool(count = this.configService.PROXY_POOL_COUNT): Promise<void> {
    await this.ensureHasProxyFile();
    const proxyList = await this.getLocalProxyList();
    // if(proxyList.length) {

    // }

    return Promise.resolve();
    this.proxyPool.length = 0;
    const handler = (resolve) => {
      if (count < this.proxyPool.length) {
        return resolve();
      } else {
        return proxyRequest({
          url: `http://www.xiladaili.com/api/?uuid=1687e914d2b74102ac0b6f0af2daa338&num=${count}&place=中国&category=1&protocol=0&sortby=0&repeat=1&format=3&position=0`,
          // headers: this.createUserAgent().headers,
        }).then((html) => {
          // const $ = cheerio.load(html);
          // const $trs = $('tbody tr');
          // $trs.each((_, tr) => {
          //   const ip = $(tr).find('td').eq(0).text();
          //   const port = $(tr).find('td').eq(1).text();
          //   this.checkIpAvailable(ip, port).then((item) => {
          //     this.proxyPool.push(item);
          //     if (count === this.proxyPool.length) {
          //       return resolve();
          //     }
          //     // 递归创建连接池
          //     handler(resolve);
          //   });
          // });
        });
      }
    };
    return new Promise((resolve) => {
      handler(resolve);
    });
  }

  /**
   * 确保本地有连接池文件
   *
   * @private
   * @memberof ProxyService
   */
  private ensureHasProxyFile() {
    const has = fs.existsSync('proxy-pool.json');
    if (!has) {
      return fs.writeJSON('proxy-pool,json', [], { spaces: 2 });
    }
    return true;
  }

  /**
   * TODO 获取本地连接池
   *
   * @private
   * @returns
   * @memberof ProxyService
   */
  private async getLocalProxyList() {
    const hasProxyPoolFile = true;
    let proxyList: string[] = [];
    const str = await fs.readFile('proxy-pool.json', 'utf8');
    const list = JSON.parse(str);
    if (list && Array.isArray(list)) {
      // for (const ip of list) {
      // }
      proxyList = list;
    }

    if (!hasProxyPoolFile) {
      return [];
    }
    return proxyList;
  }

  /**
   * 生成请求的 proxy 选项字符串
   *
   * @private
   * @param {string} host
   * @param {string} port
   * @returns
   * @memberof ProxyService
   */
  private createProxyStr(host: string, port: string) {
    return `http://${host}:${port}`;
  }

  /**
   * 检测 ip 是否合法
   *
   * @private
   * @param {string} host
   * @param {string} port
   * @returns {Promise<IpItem>}
   * @memberof ProxyService
   */
  private async checkIpAvailable(host: string, port: string): Promise<IpItem> {
    return new Promise((resolve, reject) => {
      proxyRequest({
        url: this.checkUrl,
        headers: this.createUserAgent().headers,
        proxy: this.createProxyStr(host, port),
      })
        .then(() => resolve({ host, port }))
        .catch(reject);
    });
  }

  /**
   * 生成 headers
   *
   * @private
   * @memberof ProxyService
   */
  private createUserAgent = () => ({
    headers: {
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': getRandomUserAgent(),
    },
  });
}
