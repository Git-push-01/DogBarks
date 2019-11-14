import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/users")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    console.log(this.state.apiResponse);

    return (
      <div className="Users">
        <header className="Users-header">
          <p className="Users-intro">{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default withRouter(Users);
