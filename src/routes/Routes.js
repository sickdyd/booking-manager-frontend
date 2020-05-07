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
      <Route exact path={["/", "/home"]} component={() => <Home />} />
      <Route exact path="/schedule" component={() => <Schedule />} />
      <Route exact path="/change-password" component={() => <ChangePassword />} />

      <Route exact path="/users" component={() => <Users />} />
      <Route exact path="/create-user" component={() => <CreateUser />} />
      <Route exact path="/create-bookings" component={() => <CreateBookings />} />
      <Route exact path="/settings" component={() => <Settings />} />
  </Switch>