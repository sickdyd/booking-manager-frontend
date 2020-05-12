import Axios from "axios";
import authenticate from "../classes/Authenticate";

let baseURL = "http://localhost:3333/api";

if (process.env.NODE_ENV === "production") {
  baseURL = "https://moschettab.herokuapp.com/api"
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
  
  const newToken = response.headers["x-auth-token"];

  if (newToken) {
    authenticate.setAuthentication(newToken);
    localStorage.setItem("bmtoken", newToken);
  }

  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default axios;