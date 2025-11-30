import axios from "axios";

// ✅ use YOUR BACKEND port
const api = axios.create({
  baseURL: "http://localhost:9099",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
