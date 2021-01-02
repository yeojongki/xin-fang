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
   * 用户权限不足
   */
  PERMISSION_ERROR = -1031,

  /**
   * 数据库操作失败(crud)
   */
  DB_OPERATE_ERROR = -1040,

  /**
   * 查找数据库 数据不存在
   */
  FIND_NOT_FOUND = -1041,

  /**
   * 请求太快 (e.g.发送邮件验证)
   */
  REQURES_TOO_FAST = -1051,

  /**
   * 验证邮箱不合法 (不存在/过期)
   */
  EMAIL_INVALID = -1062,

  /**
   * 验证邮箱不合法 (不存在/过期)
   */
  EMAIL_USER_INVALID = -1063,

  /**
   * 邮箱验证码不合法 (不存在/过期)
   */
  EMAIL_CODE_INVALID = -1064,

  /**
   * 两次邮箱相同
   */
  EMAIL_IS_SAME = -1065,

  /**
   * 非法更新房子
   */
  INVALID_UPDATE_HOUSE = -1090,
}
