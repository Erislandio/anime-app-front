import axios from "axios";

const client = axios.create({
  baseURL: "https://5yrwt.sse.codesandbox.io/"
});

export default client;
