import React from "react";
import Login from "./containers/login";
import Signup from "./containers/signup";
import Map from "./containers/map";
import MapContainer from "./containers/mapContainer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const loggedIn = () => {
  if (!!sessionStorage["token"])

  return <Redirect to="/mapContainer" />;

}


const logout = () => {
  if (sessionStorage["token"]) sessionStorage.removeItem("token");

  return <Redirect to="/login" />;
};

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} loggedIn={loggedIn()} />

      <Route path="/signup" component={Signup} />

      <Route path="/map" component={Map} loggedIn={loggedIn()} />

      <Route
        path="/mapContainer"
        component={MapContainer}
        loggedIn={loggedIn()}
      />
      <Route path="/logout" component={() => logout()} />
    </Switch>
  </BrowserRouter>
);
