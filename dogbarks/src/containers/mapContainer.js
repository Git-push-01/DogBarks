import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import ApiKey from "../config.js";

class MapContainer extends Component {
  state = {
    userLocation: { lat: 32, lng: 32 },
    loading: true
  };

  componentDidMount(props) {
    console.log(this.props.google.maps);
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false

        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }



  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }
    return( <Map zoom={10} google={google} places={this.props.places} initialCenter={userLocation} >
      <Marker position={userLocation} />

      </Map>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: ApiKey
})(MapContainer);
