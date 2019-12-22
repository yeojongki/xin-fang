export const isProd = process.env.NODE_ENV === 'production';

export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
