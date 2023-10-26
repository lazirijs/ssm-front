import axios from "axios";

// edite

const api = axios.create({
  baseURL: "https://ssm-back.onrender.com",
  withCredentials: true,
  credentials: 'include',
});

export { api };
