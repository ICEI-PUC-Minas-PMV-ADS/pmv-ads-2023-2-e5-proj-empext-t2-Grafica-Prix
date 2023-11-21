import http from "../http";

export async function getEmployees() {
  const { data } = await http.get(`/api/Colaborador`);
  return data;
}

export async function getSingleEmployees(query) {
  let id = query.queryKey[1];

  const { data } = await http.get(`/api/Colaborador/${id}`);
  return data;
}
