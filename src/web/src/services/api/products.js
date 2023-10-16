import http from "../http";

export async function getProducts() {
  const { data } = await http.get(`/api/Produto/`);
  return data;
}
