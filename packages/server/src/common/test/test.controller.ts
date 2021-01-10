// import { getRandomUserAgent, proxyRequest, request } from '@/utils';
// import { Controller, Get, Request } from '@nestjs/common';
// import HttpsProxyAgent = require('https-proxy-agent');
// import { ProxyService } from '../proxy/proxy.service';
// import { createBid } from '@/modules/house-spider/util';

// @Controller('test')
// export class TestController {
//   constructor(private readonly proxyService: ProxyService) {}

//   @Get('req')
//   async test(@Request() req) {
//     return req.headers;
//   }

//   @Get('proxy')
//   async proxy() {
//     const time = +new Date();
//     // const res = await request({
//     //   method: 'GET',
//     //   url: 'http://localhost:3000/api/test/req',
//     //   headers:{
//     //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5MTQ0NmE1LTVkZjMtNGFlMS1iNDRhLTdhMGZjY2U5ODQ1MyIsImlhdCI6MTYxMDE5NDY5MSwiZXhwIjoxNjEwNzk5NDkxfQ.768FbQS1FLHvht3z9Z5Yr8gxDvoQS7wEDSNooUhSZ68',
//     //     Cookie: createBid()
//     //   },
//     //   timeout: 10000,
//     // });
//     // return { time, res };
//     try {
//       // const res = await request({
//       //   url: 'https://www.douban.com/group/topic/206652748/',
//       //   // url: 'https://www.douban.com/',
//       //   // url: 'https://api.ipify.org',
//       //   timeout: 9*1000,
//       //   // proxy: false,
//       //   // httpsAgent: new HttpsProxyAgent({ host: '58.220.95.55', port: 9400 }),
//       //   // headers: {
//       //   //   Cookie: 'bid=stsAwzEwA0Y; __utmz=30149280.1607791246.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __yadk_uid=YJcqzxQyN83nuvgiqGYfx7nDFjgqkbga; __gads=ID=1abf08ec1172cefb-22074ba025c5000d:T=1607791247:RT=1607791247:S=ALNI_MZ2sPvzIN6419-_UqBdl-2rwgh4_Q; __utmc=30149280; ll="118281"; _pk_ses.100001.8cb4=*; __utma=30149280.34017415.1607791246.1610196973.1610205696.16; _pk_id.100001.8cb4=76046204183a905a.1607791246.16.1610206399.1610196971.; ap_v=0,6.0; __utmt=1; __utmb=30149280.7.5.1610206399337',
//       //   //   Accept:
//       //   //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//       //   //   'Accept-Encoding': 'gzip, deflate, br',
//       //   //   'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
//       //   //   Connection: 'keep-alive',
//       //   //   Host: 'www.douban.com',
//       //   //   Referer: 'https://www.douban.com/group/gz020/discussion?start=',
//       //   //   'Sec-Fetch-Dest': 'document',
//       //   //   'Sec-Fetch-Mode': 'navigate',
//       //   //   'Sec-Fetch-Site': 'same-origin',
//       //   //   'Sec-Fetch-User': '?1',
//       //   //   'Upgrade-Insecure-Requests': '1',
//       //   //   'User-Agent':
//       //   //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
//       //   // },
//       //   // httpsAgent: new HttpsProxyAgent({ host: '60.191.11.249', port: 3128 }),
//       //   headers: {
//       //     'user-agent': getRandomUserAgent(),
//       //   },
//       // });

//       const res = await proxyRequest<{ ip: string }>({
//         method: 'GET',
//         url: 'https://www.douban.com/',
//         timeout: 10000,
//         // proxy: 'http://114.239.210.251:9999',
//         proxy: 'http://60.191.11.249:3128',
//       });

//       return { ip: res, time: (+new Date() - time) / 1000 };
//     } catch (error) {
//       return { error, time: (+new Date() - time) / 1000 };
//     }
//   }
// }
