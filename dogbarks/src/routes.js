import React from "react";
import Login from "./containers/login";
import Signup from "./containers/signup";
import Map from "./containers/map";
import MapContainer from "./containers/mapContainer";
import { loginUser } from "./redux/actions/userActions";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";



 function loggedIn(){
  if (sessionStorage.token){

      return <Redirect to="/MapContainer" />;
  }

}
 function logout(){
  if (sessionStorage.token){

     return sessionStorage.removeItem("token");



  }
};

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} loggedIn={loggedIn()} />

      <Route path="/signup" component={Signup} />

      <Route path="/map" component={Map}  />

      <Route
        path="/mapContainer"
        component={MapContainer}

      />
      <Route path="/logout" component={() => logout()} />
    </Switch>
  </BrowserRouter>
);
