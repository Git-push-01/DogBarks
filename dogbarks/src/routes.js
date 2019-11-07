import React from "react";
import Login from "./containers/login";
import Users from "./containers/users"
import Signup from "./containers/signup"
import MapContainer from "./containers/mapContainer"

import { BrowserRouter, Route, Link } from "react-router-dom";


export default (

  <BrowserRouter>
<Route path="/login" exact component={Login} />
<Route path="/signup" exact component={Signup}/>
<Route path="/mapContainer" exact component={MapContainer}/>

<Route path="/users" exact component={Users}/>



  </BrowserRouter>
)
