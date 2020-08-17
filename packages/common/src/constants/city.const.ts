export const DEFAULT_CITY_ID = 3;

export enum CityStatus {
  OFF,
  ON,
}

export const CityStatusMap = {
  [CityStatus.ON]: '已开通',
  [CityStatus.OFF]: '未开通',
};
