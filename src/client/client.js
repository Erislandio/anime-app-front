import axios from "axios";

const client = axios.create({
  baseURL: "https://5yrwt.sse.codesandbox.io/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Content-Type": "application/json"
  }
});

export default client;
