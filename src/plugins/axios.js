import axios from "axios";

const api = axios.create({
  baseURL: "https://ssm-back.onrender.com",
  withCredentials: true,
});

export { api };
