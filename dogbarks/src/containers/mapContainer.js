import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, deleteUser } from "../redux/actions/userActions";
import { Button } from "react-bootstrap";


class MapContainer extends Component {

  componentDidMount() {
  this.props.fetchUser()
  }


  render() {

    console.log(this.props, " mapContainer delete Props");

    return (
      <div>
      <h1
        style={{
          textAlign: "left",
          fontSize: "15px",
          fontWeight: "bolder",
        }}
       >
        Welcome:{this.props.user.email}
      </h1>
      <Button onClick={() => this.props.deleteUser(this.props.user.id)}>
                DELETE
              </Button>
        <Map />
      </div>
    );
  }
}
const mapStateToProps = state => {
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
