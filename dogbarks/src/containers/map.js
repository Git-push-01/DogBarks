import React,{ useState } from 'react'
import ReactMapGL, { GeolocateControl } from 'react-map-gl'
import config from '../config'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN=config.REACT_APP_TOKEN

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10

};

const Map = () => {

  const [viewport, setViewPort ] = useState({
    width: "100%",
    height: 450,
    latitude: 0,
    longitude: 0,
    zoom: 2
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 1000 })

  return (
    <div style={{ margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click To Find Your Location or click <a href="/mapContainer">here</a> to search for a location</h1>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showUserLocation={true}

        />
      </ReactMapGL>
    </div>
  )
}

export default Map
