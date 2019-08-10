/**
 * 生成长度验证信息： `field` 不能 `higher` 于 `len` 位
 * @param {string} field 字段中文名字
 * @param {number} len 长度
 * @param {boolean} [higher=true] default true 为大于 反之小于
 * @returns
 */
export function genMsgOfLength(field: string, len: number, higher = true) {
  return { message: `${field}不能${higher ? '大' : '小'}于${len}位` };
}
