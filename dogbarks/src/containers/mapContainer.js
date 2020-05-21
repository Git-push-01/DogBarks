import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "../config";
import Map from "../components/map";

const TOKEN = config.REACT_APP_TOKEN;

class MapContainer extends Component {
  // componentWillMount() {
  //   this.props.();
  // }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default withRouter(MapContainer);
