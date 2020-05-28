import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/userActions";

class MapContainer extends Component {

  constructor() {
      super();
      this.state = { user: this.state };
      console.log(this.state, "1 state");
    }
  componentDidMount() {
      this.props.fetchUser()

  }



  render() {
    console.log(this.props, " mapContainer Props");

    return (
      <div>
        <h1
          style={{
            textAlign: "left",
            fontSize: "15px",
            fontWeight: "bolder",
          }}
        >
          Welcome:{sessionStorage.getItem("user")}
        </h1>

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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
