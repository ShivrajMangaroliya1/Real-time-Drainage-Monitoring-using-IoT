import axios from "axios";

export const apiReq = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://draindemoo.herokuapp.com/api/v1",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
