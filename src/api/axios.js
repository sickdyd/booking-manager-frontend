import Axios from "axios";

let baseURL = "http://localhost:3333/api";

if (process.env.NODE_ENV === "production") {
  baseURL = "https://sickdyd-booking-manager.herokuapp.com/api"
}

console.log("Sending requests to: ", baseURL);

const axios = Axios.create({ baseURL });

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(request => {
  console.log(request);
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default axios;