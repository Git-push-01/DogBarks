// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { withRouter } from "react-router-dom";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import Button from "react-bootstrap/Button";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
import DeckGL , { GeoJsonLayer } from "deck.gl";
// import { PathLayer } from "@deck.gl/layers";
// import MapGL, { Marker } from "react-map-gl";

const TOKEN = config.REACT_APP_TOKEN;


// const data = [
//   {
//     name: "random-name",
//     color: [101, 147, 245],
//     path: [
//       [-74.00578, 40.713067],
//       [-74.004577, 40.712425],
//       [-74.003626, 40.71365],
//       [-74.002666, 40.714243],
//       [-74.002136, 40.715177],
//       [-73.998493, 40.713452],
//       [-73.997981, 40.713673],
//       [-73.997586, 40.713448],
//       [-73.99256, 40.713863]
//     ]
//   }
// ];
// const layer = [
//   new PathLayer({
//     id: "path-layer",
//     data,
//     getWidth: data => 7,
//     getColor: data => data.color,
//     widthMinPixels: 7
//   })
// ];

class MapContainer extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    searchResultLayer: null


  };

  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });

  };


  render() {
    const { viewport, searchResultLayer } = this.state;
    return (
      <div style={{ height: "100vh" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bolder"
          }}
        >
          Use the search bar to find a location or click <a href="/map">here</a> to
          find your location
          {" "}
          <a href="/logout">Log Out</a>
        </h1>


        <ReactMapGL
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height="100%"
          onViewportChange={this.props.handleViewportChange}
          mapboxApiAccessToken={TOKEN}
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={TOKEN}
            showUserLocation={true}
            position="top-left"
          />
        </ReactMapGL>

      </div>
    );
  }
}

export default withRouter(MapContainer);
