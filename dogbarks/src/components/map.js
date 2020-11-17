import React, { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import config from "../config";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button } from "react-bootstrap";

const TOKEN = config.REACT_APP_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

const Map = () => {
  const [user, setUser] = useState({})

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 500,
    latitude: 39.0997,
    longitude: -94.5786,
    zoom: 1,
    maxZoom: 8,
    minZoom: 0,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minPitch: 0,
    maxPitch: 85,
  });

  const  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let setUser = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 3,
      };
      this.setState({
        viewport:newViewport,
        user:setUser
)}
    });
    };





  const mapRef = React.useRef();

   const _onViewportChange = (viewport) => setViewPort({ ...viewport });

  return (

    <div>
      <Button href="/logout">LOG OUT</Button>

        <Button onClick={()=> setUserLocation()}>My Location</Button>


        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => setViewPort({ ...viewport })}
        >
          {Object.keys(user).length !== 0 ? (
            <Marker latitude={user.lat} longitude={user.long}>
              <div>I'm Here!!!</div>
            </Marker>
          ) : (
            <div></div>
          )}
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
            autocomplete={true}
            mapboxApiAccessToken={TOKEN}
            showUserLocation={true}
            position="top-left"
          />
        </ReactMapGL>

    </div>
  );
};

export default Map;
