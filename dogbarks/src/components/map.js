import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import config from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { withRouter } from "react-router-dom";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";


const TOKEN = config.REACT_APP_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

const Map = () => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 900,
    latitude: 0,
    longitude: 0,
    zoom: 1,
    maxZoom: 10,
    minZoom: 0,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    dragRotate: true,
    scrollZoom: false,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minPitch: 0,
    maxPitch: 85,
  });

  // const handleViewportChange = (viewport) => {
  //   this.setState({
  //     viewport: { ...this.state.viewport, ...viewport },
  //   });
  // };
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  // const handleGeocoderViewportChange = viewport => {
  //   const geocoderDefaultOverrides = { transitionDuration: 1000 };
  //
  //   return this.handleViewportChange({
  //     ...viewport,
  //     ...geocoderDefaultOverrides,
  //   });
  // };

  // const handleOnResult = (event) => {
  //   this.setState({
  //     searchResultLayer: new GeoJsonLayer({
  //       id: "search-result",
  //       data: event.result.geometry,
  //       getFillColor: [255, 0, 0, 128],
  //       getRadius: 1000,
  //       pointRadiusMinPixels: 10,
  //       pointRadiusMaxPixels: 10,
  //     }),
  //   });
  // };

  const mapRef = React.useRef();

  const _onViewportChange = (viewport) =>
    setViewPort({ ...viewport, transitionDuration: 1000 });

  return (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        GeoLocator: Click To Find Your Location or click{" "}
        <a href="/mapContainer">here</a> to search for a location{" "}
        <a href="/logout">Log Out</a>
      </h1>

      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={false}
          showUserLocation={true}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            float: "left",
            margin: "50px",
            padding: "10px",
          }}
        >
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={_onViewportChange}
          mapboxApiAccessToken={TOKEN}
          showUserLocation={true}
          position="top-left"
        />

      </ReactMapGL>
    </div>
  );
};

export default withRouter(Map);
