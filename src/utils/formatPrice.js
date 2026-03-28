export const formatPrice = (price) => {
  if (!price || isNaN(price)) return "0";
  return Number(price).toLocaleString("en-US");
};
