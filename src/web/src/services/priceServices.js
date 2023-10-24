export function currencyFormatter(price, currency) {
  if (!price) return;

  const salaryFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
  });

  return salaryFormat.format(price);
}

export function percentagePromotion(product) {
  const promotion = Math.floor((product.promocao * 100) / product.preco);
  const percentage = 100 - promotion;
  return percentage;
}
