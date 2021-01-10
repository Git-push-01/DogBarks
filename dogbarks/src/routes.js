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


console.log(sessionStorage.token, "user test");
const logIn = () => {
sessionStorage.setItem("token", sessionStorage.token)
  return <Redirect to="/mapContainer" />


}

const logout = () => {
  sessionStorage.clear();
  return <Redirect to="/login" />;
};

export default (
  <Router>
    <Switch>
      <Route path="/logout" component={() => logout()} />
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup} />
      <Route exact path="/mapContainer" component={() => logIn()} />
    </Switch>
  </Router>
);
