import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "moment/locale/ja";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default () =>
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/login"><Login /></Route>
      <ProtectedRoute path="/" component={() => <Main />} />
    </Switch>
  </Router>