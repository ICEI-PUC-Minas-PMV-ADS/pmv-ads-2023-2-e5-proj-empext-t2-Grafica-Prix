import axios from "axios";

const http = axios.create({
  baseURL: "http://prixsystem-001-site1.anytempurl.com/",
});

export default http;
