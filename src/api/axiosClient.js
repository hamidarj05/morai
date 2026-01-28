import axios from "axios";

// Connection Avec Json-Server
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_JSON_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
