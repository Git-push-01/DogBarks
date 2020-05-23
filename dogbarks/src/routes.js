import React from "react";
import Login from "./containers/login";
import Signup from "./containers/signup";

import MapContainer from "./containers/mapContainer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const loggedIn = () => !!sessionStorage["token"]  

const logout = () => {
  sessionStorage.clear();

  return <Redirect to="/login" />;
};

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} loggedIn={loggedIn()} />

      <Route path="/signup" component={Signup} />

      <Route path="/mapContainer" component={MapContainer} loggedIn={loggedIn()} />

      <Route path="/logout" component={() => logout()} />
    </Switch>
  </BrowserRouter>
);
