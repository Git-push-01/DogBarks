import React, { useState, useEffect } from "react";
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
import axios from "axios";

const TOKEN = config.REACT_APP_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [data, setData] = useState({ parks: [] });
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

  const setUserLocation = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setViewPort({ ...viewport, latitude, longitude, zoom: 15 });
      setUserPosition({ latitude, longitude });
    });
  };

  useEffect(() => {
    const credentials =
      "client_id=WTWMKV24D404LHL133TPFGTWA2SVZJD13H0Q2UAKC1LYGWMS&client_secret=YRPLTXCSHNV4OKVKJUZ3FHHV33OAQBN1A3DKM0KMGGINTGL2";

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const query = "Dog Park";

      const fetchData = async () => {
        const result = await axios.get(
          `https://api.foursquare.com/v2/venues/search?ll=${latitude},${longitude}&query=${query}&v=20181025&${credentials}`
        );
        await setData(result.data.response.venues);
      };
      fetchData();
    });
  });

  console.log(data);

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
          >
            <div>I'm Here!!!</div>
          </Marker>
        ) : null}

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
