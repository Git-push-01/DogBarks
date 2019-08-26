import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import ApiKey from "../config.js";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }


  

  render() {
    return (
      <Map
        style={{ width: "100%", height: "75%", position: "relative" }}
        zoom={14}
        google={this.props.google}

        onClick={this.onMapClicked}
        onReady={this.fetchPlaces}

      >

        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ApiKey
})(MapContainer);
