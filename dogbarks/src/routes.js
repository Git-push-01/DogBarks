import React from "react";
import Login from "./containers/login";
import Signup from "./containers/signup";
import Map from "./containers/map";
import MapContainer from "./containers/mapContainer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// const loggedIn = () => !!sessionStorage["token"];

const logout = () => {
  sessionStorage.clear();

  return < Redirect to="/login" />;
};

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />

      <Route path="/signup" component={Signup} />

      <Route path="/map" component={Map} />

      <Route path="/mapContainer" component={MapContainer} />

      <Route path="/logout" component={() => logout()} />
    </Switch>
  </BrowserRouter>
);
