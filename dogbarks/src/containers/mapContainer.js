import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Map from "../components/map";



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
