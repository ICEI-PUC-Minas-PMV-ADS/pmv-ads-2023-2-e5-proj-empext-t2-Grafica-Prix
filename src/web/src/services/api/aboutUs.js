import http from "../http";

export async function getAboutUs() {
  const { data } = await http.get("/api/QuemSomos");
  return data;
}
