import { House, User } from '@xf/common/src/entities';
import { getRandomUserAgent } from '@/utils';
import { HouseRentType, HouseRentTypeMap } from '@xf/common/src/constants/house.const';

const chineseMap = {
  零: 0,
  一: 1,
  二: 2,
  两: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
};

/**
 * 获取字符串中第一个字符的对应数字
 *
 * @param {string} str
 * @returns {number}
 */
function getNumberOfStr(str: string): number {
  const firstStr = str.substr(0, 1);
  if (chineseMap[firstStr]) {
    return chineseMap[firstStr];
  }
  return +firstStr.match(/\d/)![0];
}

export function parseHouseHtml(html: string, title: string, toGetKeywords: string[] = []) {
  const pricesPatt1 = /\d{3,5}(?=元|\/月|每月|一个月|每个月)/g;
  const pricesPatt2 = /(月租|租金|价钱|价格|房租)(:|：| )*(\d{3,5})/g;
  const contactPatt = /((手机|电话|微信|v)号?(:|：|\s)?(\s)?([\d\w_一二两三四五六七八九零]{5,}))/;
  const sizePatt = /(\d{1,3})(多)?[平|㎡]/;
  const rentTypePatt = /(整租|合租)/;
  const modelPatt = /(([\d一二两三四五六七八九])[居室房]([123一二两三]厅)?([12一二两]厨)?([1234一二两三四]卫)?([12一二两]厨)?)/;
  const subwayPatt = /(\d+|apm|APM|广佛)号?线/;
  // const areaPatt = /(天河|越秀|荔湾|海珠|番禺|白云|黄埔|从化|增城|花都|南沙)/;
  const house: Partial<House> = {};
  const user: Partial<User> = {};
  let subwayName: string | null = null;

  // 搜索关键词
  const keywords: string[] = [];
  if (toGetKeywords.length) {
    for (let index = 0; index < toGetKeywords.length; index++) {
      const keyword = toGetKeywords[index];
      if (title.includes(keyword)) {
        keywords.push(keyword);
        // 只需要查找到一个关键词
        break;
      }
    }
  }

  let price = 0;
  // price
  const resPricesPatt1 = pricesPatt1.exec(html);
  let resPricesPatt2: RegExpExecArray | null = null;
  resPricesPatt1 ? (price = +resPricesPatt1[0]) : '';

  // no match pricesPatt1
  if (!price) {
    resPricesPatt2 = pricesPatt2.exec(html);
    if (resPricesPatt2) {
      price = +resPricesPatt2[3];
    }
  }
  house.price = price;

  // contact way
  const contactTypeMap = {
    手机: 'mobile',
    电话: 'mobile',
    微信: 'wechat',
    v: 'wechat',
  };
  const contactResult = contactPatt.exec(html);
  if (contactResult) {
    // mobile or wechat
    const contactType = contactTypeMap[contactResult[2]];
    // value
    user[contactType] = contactResult[5];
  }

  // size
  const resSize = sizePatt.exec(html);
  house.size = resSize ? +resSize[0].replace(/\D/g, '') : 0;

  // rent type
  const resRentType = rentTypePatt.exec(html);
  if (resRentType) {
    if (resRentType[0] === HouseRentTypeMap[HouseRentType.ALL]) {
      house.rentType = HouseRentType.ALL;
    }
    if (resRentType[0] === HouseRentTypeMap[HouseRentType.PART]) {
      house.rentType = HouseRentType.PART;
    }
  }

  // model
  // modelPatt.exec('整租·裕龙五区 3室1厅2厨房2卫 南/北')
  // ["3室1厅2厨", "3室1厅2厨", "3", "1厅", "2厨", 2卫, undefined, index: 8, input: "整租·裕龙五区 3室1厅2厨房 南/北", groups: undefined]
  const resModel = modelPatt.exec(html);
  if (resModel) {
    resModel[2] && (house.bedroomNumber = getNumberOfStr(resModel[2]));
    resModel[3] && (house.livingroomNumber = getNumberOfStr(resModel[3]));
    resModel[4] && (house.kitchenNumber = getNumberOfStr(resModel[4]));
    resModel[5] && (house.bathroomNumber = getNumberOfStr(resModel[5]));
    resModel[6] && (house.kitchenNumber = getNumberOfStr(resModel[6]));
  }

  // subwayPatt.exec('a阿斯顿14号线爱是广佛线线')
  //  ["14号线", "14", index: 4, input: "a阿斯顿14号线爱是广佛线线", groups: undefined]
  const resSubway = subwayPatt.exec(html) || subwayPatt.exec(title);
  if (resSubway) {
    subwayName = resSubway[1] + (Number.isInteger(+resSubway[1]) ? '号线' : '线');
  }

  // area
  // const resArea = areaPatt.exec(html);
  // house.area = resArea ? resArea[0] : null;

  return {
    keywords,
    house,
    subwayName,
    user,
  };
}

export const createUserAgent = () => ({
  headers: {
    Host: 'www.douban.com',
    Referer: 'https://www.douban.com/group/gz020/discussion?start=',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': getRandomUserAgent(),
  },
});

/**
 * 生成 11 位 bid for Cookie: bid=xxx
 *
 * @export
 * @returns
 */
export function createBid() {
  const leng = 11;
  const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let result = '';
  for (let i = 0; i < leng; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return `bid=${result}`;
}
