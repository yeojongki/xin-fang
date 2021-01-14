import fs = require('fs-extra');

/**
 * 修改配置文件
 *
 * @export
 * @param {RegExp} reg 要求必须为2个分组形式的正则表达式 e.g./(SPIDER_IS_OPEN_HOUSE=)(\d)/
 * @param {((handler:RegExpMatchArray | null)=>)} matchedHandler
 * @returns
 */
export async function modifyConfig(reg: RegExp, nextValHandler: (val: string) => string | number) {
  const file = `.env.${process.env.NODE_ENV}`;
  const fileStr = await fs.readFile(file, 'utf-8');
  const matched = fileStr.match(reg);
  if (matched && matched[1] && matched[2]) {
    const nextValue = nextValHandler(matched[2]);
    const nextFileStr = fileStr.replace(`${matched[1]}${matched[2]}`, `${matched[1]}${nextValue}`);
    // 重新写入文件
    return await fs.writeFile(file, nextFileStr);
  }
  return Promise.reject(new Error(`修改配置文件失败, reg:${reg}`));
}
