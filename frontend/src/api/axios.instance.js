import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:6868/api/v1",
  //  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
