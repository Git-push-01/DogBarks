import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/userActions";

class MapContainer extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props, " mapContainer Props");
    return (
      <div>
      <h1 style={{ textAlign: "left", fontSize: "25px", fontWeight: "bolder"}}>{this.props.user.email}</h1>
        <Map/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.current,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
