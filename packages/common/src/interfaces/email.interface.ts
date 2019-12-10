export interface ISendEmailOptions {
  /**
   * 管理控制台中配置的发信地址
   * @type {string}
   */
  AccountName?: string;

  /**
   * 地址类型。取值：
   * 0：为随机账号 1：为发信地址
   * @type {number}
   */
  AddressType?: number;

  /**
   * 目标地址，多个 email 地址可以用逗号分隔，最多100个地址。
   * @example test1@example.com
   * @type {string}
   */
  ToAddress: string;

  /**
   * 邮件主题
   * @type {string}
   */
  Subject: string;

  /**
   * 使用管理控制台中配置的回信地址（状态必须是验证通过）。
   * @type {boolean}
   */
  ReplyToAddress: boolean;

  /**
   * 系统规定参数。取值：SingleSendMail。
   * @type {string}
   */
  Action?: string;

  /**
   * 1：为打开数据跟踪功能
   * 0（默认）：为关闭数据跟踪功能。
   * @type {string}
   */
  ClickTrace?: string;

  /**
   * 发信人昵称，长度小于15个字符
   * @example 发信人昵称设置为”小红”，发信地址为 test@example.com，收信人看到的发信地址为"小红"<test@example.com>。
   * @type {string}
   */
  FromAlias?: string;

  /**
   * 邮件 html 正文，限制28K。
   * @type {string}
   */
  HtmlBody?: string;

  /**
   * 标签
   * @type {string}
   */
  TagName?: string;

  /**
   * 邮件 text 正文，限制28K。
   * @type {string}
   * @memberof ISendEmailOptions
   */
  TextBody?: string;

  /**
   * 以下为公共参数
   * @see https://help.aliyun.com/document_detail/29440.html?spm=a2c4g.11186623.6.592.20f13972khUg03
   */

  /**
   * 返回值的类型，支持 JSON 与 XML。默认为 JSON。
   * @type {string}
   * @memberof ISendEmailOptions
   */
  Format?: string;

  /**
   * API 版本号，为日期形式：YYYY-MM-DD。如果参数 RegionID 是 cn-hangzhou，则版本对应为2015-11-23；
   * 如参数 RegionID 是cn-hangzhou 以外其他 Region，比如 ap-southeast-1，则版本对应为2017-06-22。
   * @type {string}
   */
  Version: string;

  /**
   * 阿里云颁发给用户的访问服务所用的密钥 ID
   * @type {string}
   */
  AccessKeyId?: string;

  /**
   * 签名结果串，关于签名的计算方法，请参见签名机制。
   * @type {string}
   */
  Signature: string;

  /**
   * 签名方式，目前支持 HMAC-SHA1。
   * @type {string}
   */
  SignatureMethod: string;

  /**
   * 请求的时间戳。日期格式按照 ISO8601 标准表示，并需要使用 UTC 时间。格式为YYYY-MM-DDThh:mm:ssZ。
   * @type {string}
   * @example 2015-11-23T04:00:00Z（为北京时间 2015 年 11 月 23 日 12 点 0 分 0 秒）。
   */
  Timestamp: string;

  /**
   * 签名算法版本，目前版本是1.0。
   * @type {string}
   */
  SignatureVersion: string;

  /**
   * 唯一随机数，用于防止网络重放攻击。不同的请求要使用不同的随机数值。
   * 您可以使用UUID（随机串），也可以自定义。
   * @type {string}
   */
  SignatureNonce: string;

  /**
   * 机房信息 ，目前支持 cn-hangzhou、ap-southeast-1、ap-southeast-2。
   * @type {string}
   */
  RegionId: string;
}
