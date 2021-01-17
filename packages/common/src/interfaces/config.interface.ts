import {
  VALUE_TYPE_STRING,
  VALUE_TYPE_BOOLEAN,
  VALUE_TYPE_NUMBER,
  VALUE_TYPE_ARRAY_STRING,
} from '../constants/config.const';

export type ConfigValueType =
  | typeof VALUE_TYPE_STRING
  | typeof VALUE_TYPE_BOOLEAN
  | typeof VALUE_TYPE_NUMBER
  | typeof VALUE_TYPE_ARRAY_STRING;

export interface ISpiderConfig<T = any> {
  /**
   * 配置的类型 字符串 数字等
   *
   * @type
   * @memberof ISpiderConfig
   */
  type: ConfigValueType;

  /**
   * 配置名称
   *
   * @type {string}
   * @memberof ISpiderConfig
   */
  name: string;

  /**
   * 配置的 key
   *
   * @type {string}
   * @memberof ISpiderConfig
   */
  key: string;

  /**
   * 配置的值
   *
   * @type {ConfigValueType}
   * @memberof ISpiderConfig
   */
  value: T | string | number | boolean | Array<T>;

  /**
   * 配置项的额外信息
   *
   * @type {string}
   * @memberof ISpiderConfig
   */
  extra?: string;
}
