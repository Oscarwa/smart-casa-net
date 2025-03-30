export const toCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
  }).format(value);
};

export const toInteger = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};
