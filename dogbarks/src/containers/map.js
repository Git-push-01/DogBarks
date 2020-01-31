import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import config from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "react-map-gl-geocoder";
import Button from "react-bootstrap/Button";
// import DeckGL, {FlyToInterpolator}  from "deck.gl";
import { withRouter } from "react-router-dom";
// import { PathLayer } from "@deck.gl/layers";

const TOKEN = config.REACT_APP_TOKEN;

const geolocateStyle = {
  float: 'left',
   margin: '50px',
   padding: '10px'
};
// const data = [
//   {
//     name: "random-name",
//     color: [101, 147, 245],
//     path: []
//   }
// ];
//
const Map = () => {
  // const layer = [
  //   // new PathLayer({
  //   //   id: "path-layer",
  //   //   data,
  //   //   getWidth: data => 7,
  //   //   getColor: data => data.color,
  //   //   widthMinPixels: 7
  //   // })
  // ];

  const [viewport, setViewPort, searchResultLayer] = useState({

 width: "100%",
 height: 900,
 latitude: 0,
 longitude: 0,
 zoom: 2,
 searchResultLayer: null

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
        {" "}
        <a href="/logout">Log Out</a>
      </h1>

        <ReactMapGL
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
        </ReactMapGL>


      </div>

  );
};

export default withRouter(Map);
