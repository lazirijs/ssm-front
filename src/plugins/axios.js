import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.103:8090", //"https://ssm-back.onrender.com",
  withCredentials: true,
});

export { api };
