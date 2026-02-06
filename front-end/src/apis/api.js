import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change to your backend URL (u can use env variables instead)
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// should use interceptor if u need

export default api;