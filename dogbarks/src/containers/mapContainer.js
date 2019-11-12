// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import DeckGL, { GeoJsonLayer } from "deck.gl";

const TOKEN = config.REACT_APP_TOKEN;



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
        >Use the search bar to find a location or click <a href="/">here</a> to find your location
        </h1>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height= "70%"
          onViewportChange={this.handleViewportChange}
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
        </MapGL>



      </div>
    );
  }
}



export default withRouter(MapContainer);
