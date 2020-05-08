import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Schedule from "../pages/Schedule";
import ChangePassword from "../pages/ChangePassword";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";
import CreateBookings from "../pages/CreateBookings";
import Settings from "../pages/Settings";

export default () =>
  <Switch>
      <Route exact path={[process.env.PUBLIC_URL + "/", process.env.PUBLIC_URL + "/home"]} component={() => <Home />} />
      <Route exact path={process.env.PUBLIC_URL + "/schedule"} component={() => <Schedule />} />
      <Route exact path={process.env.PUBLIC_URL + "/change-password"} component={() => <ChangePassword />} />

      <Route exact path={process.env.PUBLIC_URL + "/users"} component={() => <Users />} />
      <Route exact path={process.env.PUBLIC_URL + "/create-user"} component={() => <CreateUser />} />
      <Route exact path={process.env.PUBLIC_URL + "/create-bookings"} component={() => <CreateBookings />} />
      <Route exact path={process.env.PUBLIC_URL + "/settings"} component={() => <Settings />} />
  </Switch>