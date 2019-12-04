import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import config from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "deck.gl";
import { PathLayer } from "@deck.gl/layers";
import MapGL, { Marker } from "react-map-gl";

const TOKEN = config.REACT_APP_TOKEN;


const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10
};
const data = [
  {
    name: "random-name",
    color: [101, 147, 245],
    path: [
      [-74.00578, 40.713067],
      [-74.004577, 40.712425],
      [-74.003626, 40.71365],
      [-74.002666, 40.714243],
      [-74.002136, 40.715177],
      [-73.998493, 40.713452],
      [-73.997981, 40.713673],
      [-73.997586, 40.713448],
      [-73.99256, 40.713863]
    ]
  }
];

const Map = () => {
  const layer = [
    new PathLayer({
      id: "path-layer",
      data,
      getWidth: data => 7,
      getColor: data => data.color,
      widthMinPixels: 7
    })
  ];

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 450,
    latitude: 0,
    longitude: 0,
    zoom: 2
  });

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 1000 });

  return (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        GeoLocator: Click To Find Your Location or click{" "}
        <a href="/mapContainer">here</a> to search for a location
      </h1>
      <DeckGL
        initialViewState={{
          longitude: -74.006,
          latitude: 40.7128,
          zoom: 15
        }}
        controller={true}
        layers={layer} // layer here
      >
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={_onViewportChange}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
          />
        </ReactMapGL>
      </DeckGL>
    </div>
  );
};

export default Map;
