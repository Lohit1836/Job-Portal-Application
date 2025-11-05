import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  auth: {
    username: "lohit",
    password: "1234",
  },
});

export default api;
