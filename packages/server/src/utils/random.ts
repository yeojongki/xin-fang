/**
 * 生成 [min, max] 范围内的随机数
 * https://www.cnblogs.com/starof/p/4988516.html
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function createRangeRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
