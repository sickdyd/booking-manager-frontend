import Axios from "axios";
import authenticate from "../classes/Authenticate";
import jwt_decode from "jwt-decode";
import moment from "moment";

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
  
  const newToken = response.headers["x-auth-token"];

  if (newToken) {
    const { exp } = jwt_decode(newToken)
    console.log(moment.unix(exp).format("HH:mm:ss"))
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