import http from "../http";

export async function getBanners() {
  const { data } = await http.get("/api/Banner");
  return data;
}
