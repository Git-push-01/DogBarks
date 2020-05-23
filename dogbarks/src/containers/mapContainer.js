import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/userActions";



class MapContainer extends Component {
  componentDidMount() {
      this.props.fetchUser();
    }

  render() {
    console.log(this.props, " mapContainer Props");
    return (
      <div>
        <Map user={fetchUser()}/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
