export enum HouseStatus {
  ON,
  OFF,
  ILLEGAL,
}

export const HouseStatusMap = {
  [HouseStatus.ON]: '上架中',
  [HouseStatus.OFF]: '已下架',
  [HouseStatus.ILLEGAL]: '不合法',
};
