import http from "../http";

export async function getMe(query) {
  let id = query.queryKey[1];

  const { data } = await http.get(`/api/Usuario/${id}/`);
  return data;
}

export async function getClients() {
  const { data } = await http.get(`/api/Usuario/`);
  return data;
}
