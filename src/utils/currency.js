// Currency util. Prices in the catalog are stored in USD.
// 1 USD ≈ 1500 NGN (adjustable).
const USD_TO_NGN = 1500;

export const formatPrice = (usd) => {
  const naira = usd * USD_TO_NGN;
  return `₦${Math.round(naira).toLocaleString('en-NG')}`;
};

export const nairaFromUsd = (usd) => usd * USD_TO_NGN;
