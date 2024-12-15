import axios from "axios";

const apiUrl = process.env.API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
