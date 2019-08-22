export enum errorCode {
  SUCCESS = 0,
  ERROR = -1,

  /**
   * 验证数据类型错误
   */
  VALIDATION_ERROR = -1001,

  /**
   * 用户名或密码错误
   */
  LOGIN_ERROR = -1002,

  /**
   * 用户不存在
   */
  USER_NOT_FOUND = -1003,

  /**
   * 用户名已存在
   */
  USER_NAME_EXIST = -1004,

  /**
   * JWT 不存在
   */
  JWT_NOT_FOUND = -1020,

  /**
   * JWT 过期
   */
  JWT_EXPIRED = -1021,

  /**
   * 角色权限不足
   */
  ROLE_AUTH_ERROR = -1030,

  /**
   * 数据库操作失败(crud)
   */
  DB_OPERATE_ERROR = -1040,

  /**
   * 查找数据库 数据不存在
   */
  FIND_NOT_FOUND = -1041,
}
