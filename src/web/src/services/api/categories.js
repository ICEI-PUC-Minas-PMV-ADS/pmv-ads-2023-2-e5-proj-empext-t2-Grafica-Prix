import http from "../http";

export async function getCategories() {
  const { data } = await http.get(`/api/Categoria/`);
  return data;
}
