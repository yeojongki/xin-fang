import * as crypto from 'crypto';

// key、iv 可以是Buffer，也可以是utf8编码的字符串，这里需要关注的是它们的长度：
// key：根据选择的算法有关，比如 aes128、aes192、aes256，长度分别是128、192、256位（16、24、32字节）
// iv：都是128位（16字节）

const defaultKey = crypto.randomBytes(192 / 8);
const defaultIv = crypto.randomBytes(128 / 8);
const defaultAlgorithm = 'aes-192-cbc';

export function encode(
  src: string,
  algorithm: string = defaultAlgorithm,
  key: crypto.CipherKey = defaultKey,
  iv: crypto.BinaryLike | null = defaultIv,
  options?: crypto.CipherCCMOptions,
) {
  const cipher = crypto.createCipheriv(algorithm, key, iv, options);
  cipher.update(src, 'utf8', 'hex');
  return cipher.final('hex');
}

export function decode(
  data: string,
  algorithm: string = defaultAlgorithm,
  key: crypto.BinaryLike = defaultKey,
  iv: crypto.BinaryLike | null = defaultIv,
  options?: crypto.CipherCCMOptions,
) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv, options);
  decipher.update(data, 'hex', 'utf8');
  return decipher.final('utf8');
}
