export function currencyFormatter(price, currency) {
  if (!price) return;

  const salaryFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
  });

  return salaryFormat.format(price);
}
