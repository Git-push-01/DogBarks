import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, deleteUser } from "../redux/actions/userActions";
import { Button } from "react-bootstrap";

class MapContainer extends Component {
  componentDidMount() {
    this.props.fetchUser();


  const parksData =
    fetch('https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson',{
      headers: {

     'Content-Type': 'application/geo+json',
     'X-Api-Key': 'ecSmq2DmpfDof8AJ5DaDSpSGjVKyMJuEAVTRJwJY',

   },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(responseJson => console.log(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });

}

  render() {
    console.log(this.props.user, " mapContainer delete Props");
    const userEmail = this.props.user.email;
    const user = this.props.user.id;

    return (
      <div >
        <h1
          style={{
            textAlign: "left",
            fontSize: "15px",
            fontWeight: "bolder",
          }}
        >
          Welcome:{userEmail}
        </h1>
        <Button  href="/logout" onClick={() => this.props.deleteUser(user)}>DELETE USER</Button>
        <Map />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      deleteUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
