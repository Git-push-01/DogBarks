import React, { Component } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { withRouter } from "react-router-dom";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Map from "../components/map";



const TOKEN = config.REACT_APP_TOKEN;

class MapContainer extends Component {



  // componentWillMount() {
  //   this.props.();
  // }



  render() {
  
    return (
       <div>
          <Map/>

          </div>
    );
  }
}

export default withRouter(MapContainer);
