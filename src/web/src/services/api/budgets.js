import http from "../http";

export async function getBudgets() {
  const { data } = await http.get("/api/Orcamento/produtos-no-carrinho");
  return data;
}

export async function getBudgetsMostPlaced() {
  http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  const { data } = await http.get("/api/Orcamento/produtos-mais-colocados");
  return data;
}
