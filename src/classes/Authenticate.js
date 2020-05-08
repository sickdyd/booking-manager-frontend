import jwt_decode from "jwt-decode";
import client from "../api/client";
import handleError from "../notifications/handleError";
import axios from "../api/axios";

class Authenticate {

  constructor() {

    this.authenticated = false;

    const token = localStorage.getItem("bmtoken");

    if (token) {
     this.setAuthentication(token);
     this.authenticated = true;
    }
  }

  async login(email, password) {

    return client.login(email, password)
      .then(res => {
        this.setAuthentication(res.data.token);
        localStorage.setItem("bmtoken", res.data.token);
      })
      .catch(err => handleError(err));
  }

  setAuthentication(token) {

    this.authenticated = true;
    this.token = token;

    const {
      _id,
      name,
      admin,
    } = jwt_decode(token);

    this.id = _id;
    this.name = name;
    this.admin = admin;

    axios.defaults.headers.common["x-auth-token"] = token;

  }

  logout(history) {
    this.authenticated = false;
    localStorage.removeItem("bmtoken");
    axios.defaults.headers.common["x-auth-token"] = undefined;
    history.push(process.env.PUBLIC_URL + "/login");
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isAdmin() {
    return this.admin;
  }

  getToken() {
    return this.token;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

}

export default new Authenticate();