export const formatPrice = (price) => {
  if (!price || isNaN(price)) return "0 DH";
  return `${Number(price).toLocaleString("en-US")} DH`;
};
