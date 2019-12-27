export const dva = {
  config: {
    onError(e: Event) {
      console.error(e);
      e.preventDefault();
    },
  },
};
