import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import config from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL, {FlyToInterpolator}  from "deck.gl";
import { withRouter } from "react-router-dom";
// import { PathLayer } from "@deck.gl/layers";

const TOKEN = config.REACT_APP_TOKEN;

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10
};
// const data = [
//   {
//     name: "random-name",
//     color: [101, 147, 245],
//     path: []
//   }
// ];

const Map = () => {
  const layer = [
    // new PathLayer({
    //   id: "path-layer",
    //   data,
    //   getWidth: data => 7,
    //   getColor: data => data.color,
    //   widthMinPixels: 7
    // })
  ];

  const [viewport, setViewPort] = useState({

    latitude: 0,
    longitude: 0,
    zoom: 2,

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

      <div style={{position: "relative"}}>
      <DeckGL
        initialViewState={{
          longitude: -74.006,
          latitude: 40.7128,
          zoom: 12,
          bearing: 0,
          pitch: 0,
          transitionInterpolator: new FlyToInterpolator()
        }}
        controller={true}
        layers={layer}
        {...viewport}// layer here
        >
        <ReactMapGL
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={_onViewportChange}
          width="70%"
          height="70%"
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
      </div>

  );
};

export default withRouter(Map);
