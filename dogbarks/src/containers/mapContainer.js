// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useState } from "react"
import { withRouter } from "react-router-dom";
import MapGL, {GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import config from '../config';

const TOKEN=config.REACT_APP_TOKEN


const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const MapContainer = () => {







  const [viewport, setViewPort ] = useState({
    width: "50%",
    height: 900,
    latitude: 0,
    longitude: 0,
    zoom: 3
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 3000 })

  return(
<div id='map' ><div style={{ margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click To Find Your Location or click <a href="/search">here</a> to search for a location</h1>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div></div>
)

}




export default withRouter(MapContainer)
