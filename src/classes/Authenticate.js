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
        this.setAuthentication(res.data);
        localStorage.setItem("bmtoken", res.data);
      })
      .catch(err => handleError(err));
  }

  setAuthentication(token) {

    const {
      _id,
      admin,
    } = jwt_decode(token);

    this.token = token;
    this.id = _id;
    this.admin = admin;

    axios.defaults.headers.common["x-auth-token"] = token;

    this.authenticated = true;

  }

  logout(history) {
    this.authenticated = false;
    localStorage.removeItem("bmtoken");
    axios.defaults.headers.common["x-auth-token"] = undefined;
    document.location.href="/";
    // history.push("/login");
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