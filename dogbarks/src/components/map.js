import React, { useState, useEffect } from "react";
import { makeGeoJSON } from "../utils";
import axios from "axios";
 import "mapbox-gl/dist/mapbox-gl.css"
import ReactMapGL, {
  Source,
  Layer,
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
  const [getParks, setParks] = useState();
  const [loading, setLoading] = useState(true);

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
    let isCancelled = false;
    let source = axios.CancelToken.source();
    function getMyAPI() {
      return "https://cors-anywhere.herokuapp.com/https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson";
    }
    async function fetchData() {
      let response;
      if (!isCancelled) {
        response = await axios(getMyAPI());
      }

      setParks(response.data);
      setLoading(false);
    }

    fetchData();

    return () => {
      isCancelled = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  let data;
  // console.log(data);
  if (!loading) {
    data = makeGeoJSON(getParks);
  }

  const mapRef = React.useRef();

  const _onViewportChange = (viewport) => setViewPort({ ...viewport });

  return (
    <div>
      <Button href="/logout">LOG OUT</Button>
      {loading && <h1>Loading</h1>}
      {!loading && (
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
            autocomplete={true}
            mapboxApiAccessToken={TOKEN}
            showUserLocation={true}
            position="top-left"
          />
          {!loading && (
            <Source type="geojson" data={data}>
              <Layer id="point" type="circle" />
            </Source>
          )}
        </ReactMapGL>
      )}
    </div>
  );
};

export default Map;
