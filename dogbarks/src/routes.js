import React from "react";
import Login from "./containers/login";
import Users from "./containers/users";
import Signup from "./containers/signup";
import Map from "./containers/map";
import MapContainer from "./containers/mapContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default (
  <BrowserRouter>
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Switch>
      <Route exact path="/" component={Map} />

      <Route exact path="/mapContainer" component={MapContainer} />
    </Switch>
    <Route path="/users" exact component={Users} />
  </BrowserRouter>
);
