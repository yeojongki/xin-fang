export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_PAGE_OPTIONS = Array(5)
  .fill(DEFAULT_PAGE_SIZE)
  .map((n, i) => `${n * (i + 1)}`);