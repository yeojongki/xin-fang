/**
 * 房子状态枚举
 */
export enum HouseStatus {
  /**
   * 上架中
   */
  ON,
  /**
   * 已下架
   */
  OFF,
  // ILLEGAL,
}

export const HouseStatusMap = {
  [HouseStatus.ON]: '上架中',
  [HouseStatus.OFF]: '已下架',
  // [HouseStatus.ILLEGAL]: '不合法',
};

export const houseStatusOptions = Object.keys(HouseStatusMap).map((k) => ({
  value: k,
  name: HouseStatusMap[k],
}));

/**
 * 房子审核状态枚举
 */
export enum HouseReviewed {
  /**
   * 未审核
   */
  NO,
  /**
   * 已审核
   */
  YES,
}

export const HouseReviewedMap = {
  [HouseReviewed.NO]: '未审核',
  [HouseReviewed.YES]: '已审核',
};

export const houseReviewedOptions = Object.keys(HouseReviewedMap).map((k) => ({
  value: k,
  name: HouseReviewedMap[k],
}));

/**
 * 房子出租支付类型枚举
 */
export enum HouseRentPayType {
  /**
   * 按月付
   */
  MONTH,
  /**
   * 按季付
   */
  SEASON,
  /**
   * 按天付
   */
  DAY,
  /**
   * 按年付
   */
  YEAR,
  /**
   * 面议
   */
  OTHER,
}

export const HouseRentPayTypeMap = {
  [HouseRentPayType.MONTH]: '按月付',
  [HouseRentPayType.SEASON]: '按季付',
  [HouseRentPayType.DAY]: '按天付',
  [HouseRentPayType.YEAR]: '按年付',
  [HouseRentPayType.OTHER]: '面议',
};

export const HouseRentPayTypeOptions = Object.keys(HouseRentPayTypeMap).map((k) => ({
  value: k,
  name: HouseRentPayTypeMap[k],
}));

/**
 * 房子出租类型枚举
 */
export enum HouseRentType {
  /**
   * 未知
   */
  UNKNOW,
  /**
   * 整租
   */
  ALL,
  /**
   * 合租
   */
  PART,
}

export const HouseRentTypeMap = {
  [HouseRentType.UNKNOW]: '未知',
  [HouseRentType.ALL]: '整租',
  [HouseRentType.PART]: '合租',
};

export const HouseRentTypeOptions = Object.keys(HouseRentTypeMap).map((k) => ({
  value: k,
  name: HouseRentTypeMap[k],
}));

/**
 * 发布来源类型枚举
 */
export enum HousePostType {
  /**
   * 平台
   */
  PLATFORM,
  /**
   * 豆瓣
   */
  DOUBAN,
}

export const HousePostTypeMap = {
  [HousePostType.PLATFORM]: '平台',
  [HousePostType.DOUBAN]: '豆瓣',
};

export const HousePostTypeOptions = Object.keys(HousePostTypeMap).map((k) => ({
  value: k,
  name: HouseRentTypeMap[k],
}));
