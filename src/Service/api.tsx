import axios from "axios";

const apisphp = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-type": "application/json" },
  withCredentials: true, // Cho phép gửi cookie HTTP-only cùng với request
});
export default apisphp;
