import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import MapContainer from "./containers/mapContainer"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/users")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }
  

  render() {
    console.log(this.state.apiResponse);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p className="App-intro">{this.state.apiResponse}</p>
        </header>
        <MapContainer/>
      </div>
    );
  }
}
// <div>
//   <h1>{this.state.selectedPlace.name}</h1>
// </div>

export default(App);
