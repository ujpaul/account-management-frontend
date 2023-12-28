import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"))?.access_token;
const myApi = axios.create({
  "content-type": "application/json",
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : "",
});

export default myApi;
