import React, { useState, useEffect } from "react";

import MapGL, {
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import config from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
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
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 500,
    latitude: 0,
    longitude: 0,
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

  const data = useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson"
      );
      response = await response.json();

      console.log(response);
    }

    fetchMyAPI();
  }, []);

  const mapRef = React.useRef();

  const _onViewportChange = (viewport) =>
    setViewPort({ ...viewport, transitionDuration: 1000 });

  return (
    <div>
      <Button href="/logout">LOG OUT</Button>

      <MapGL
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
        <Source id="points" type="geojson" data={data}/>
          <Layer
            id="points"
            type="circle"
            source="points"
            paint={{
              "circle-radius": 6,
              "circle-color": "#1978c8",
            }}
          />

      </MapGL>
    </div>
  );
};

export default Map;
