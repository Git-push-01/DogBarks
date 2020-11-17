import React, { useState, setState, useEffect } from "react";
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
  const [userPosition, setUserPosition] = useState(null);
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
  useEffect(() => {
    setUserLocation();
  }, []);

  function setUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setViewPort({ ...viewport, latitude, longitude, zoom: 15});
      setUserPosition({ latitude, longitude });
    });
  }

  const mapRef = React.useRef();

  const _onViewportChange = (viewport) => setViewPort({ ...viewport });

  return (
    <div>
      <Button href="/logout">LOG OUT</Button>

      <Button onClick={() => setUserLocation()}>My Location</Button>

      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewPort({ ...viewport })}
      >
        {userPosition !== null ? (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          ><div>I'm Here!!!</div></Marker>
        ) : null}
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
