import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./containers/login";
import Signup from "./containers/signup";
import MapContainer from "./containers/mapContainer";

const logout = () => {
  sessionStorage.clear();
  return <Redirect to="/login" />;
};

export default (
  <Router>
    <Switch>
      <Route path="/logout" component={() => logout()} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/mapContainer" component={MapContainer} />
    </Switch>
  </Router>
);
