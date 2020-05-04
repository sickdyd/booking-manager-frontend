import axios from "../api/axios";
import { message } from "antd";
import authenticate from "../classes/Authenticate";
import handleError from "../notifications/handleError";

export default {

  // Authentication
  login(email, password) {
    return axios.post("/authenticate/", { email, password })
  },

  // Schedule
  getSchedule() {
    return axios.get("/schedule/")
  },

  // User
  book(slotId) {
    return axios.post("/bookings/", { id: slotId, user: authenticate.getId() })
      .then(res => { message.success("予約をしました。"); return res; })
      .catch(err => handleError(err))
  },

  deleteBooking(id) {
    return axios.delete("/bookings/" + id)
      .then(res => { message.success("予約が削除されました。"); return res; })
      .catch(err => handleError(err))
  },

  getUserBookings(id) {
    return axios.get("/users/" + id + "/bookings")
      .then(res => res)
      .catch(err => handleError(err))
  },

  // Admin

  getSettings() {
    return axios.get("/settings/")
      .then(res => res)
      .catch(err => handleError(err))
  },

  saveSettings(settings) {
    return axios.put("/settings/", settings)
      .then(res => { message.success("Settings saved"); return res; })
      .catch(err => handleError(err))
  },

  getUsers() {
    return axios.get("/users/")
      .then(res => res)
      .catch(err => handleError(err))
  },

  updateUser(user, userId) {
    return axios.patch("/users/" + userId, user)
      .then(res => { message.success("User data udpated"); return res; })
      .catch(err => handleError(err))
  },

  createUser(user) {
    return axios.post("/users", user)
      .then(res => { message.success("User created"); return res; })
      .catch(err => handleError(err))
  },

  changePassword(password, userId) {
    return axios.patch("/users/" + userId, { password })
      .then(res => { message.success("Password changed"); return res; })
      .catch(err => handleError(err))
  },

  close(slotId) {
    return axios.post("/bookings/close", { id: slotId })
      .then(res => { message.success("Slot closed"); return res; })
      .catch(err => handleError(err))
  },

  open(id) {
    return axios.delete("/bookings/" + id)
      .then(res => { message.success("Slot opened"); return res; })
      .catch(err => handleError(err))
  },

  bookForUser(slotId, user) {
    return axios.post("/bookings/", { id: slotId, user: user })
      .then(res => { message.success("Slot assigned"); return res; })
      .catch(err => handleError(err))
  },

  deleteUserBooking(id) {
    return axios.delete("/bookings/" + id)
    .then(res => { message.success("Booking deleted"); return res; })
    .catch(err => handleError(err))
  }
}