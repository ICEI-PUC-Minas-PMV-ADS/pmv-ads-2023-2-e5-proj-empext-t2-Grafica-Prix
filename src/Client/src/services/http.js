import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7180/",
});

export default http;
