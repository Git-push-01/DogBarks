import React from "react";
import Login from "./containers/login";
import Users from "./containers/users"
import MapContainer from "./containers/mapContainer"
import { BrowserRouter, Route, Link } from "react-router-dom";


export default (

  <BrowserRouter>
<Route path="/login" exact component={Login} />
<Route path="/users" exact component={Users}/>
<Route path="/mapContainer" exact component={MapContainer}/>


  </BrowserRouter>
)
