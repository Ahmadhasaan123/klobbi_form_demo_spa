import axios from "axios";

export const Api = axios.create({
  baseURL: "http://192.168.1.16:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
