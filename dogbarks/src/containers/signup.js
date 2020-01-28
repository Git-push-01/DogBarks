import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import Form from "react-bootstrap/Form";


function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {

    email: email.length === 0,
    password: password.length === 0
  };
}

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const field = e.target.name;
    let state = this.state;

    state[field] = e.target.value;
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();

   const user = this.state;
   this.props.signupUser(user, () => this.props.history.push("/login"));
    this.setState({
     email: "",
     password: ""
   });
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    console.log(this.state);
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const { email, password } = this.state;

    return (
      <div>

        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 10 + "px"
          }}
          className="signup"
          onSubmit={this.onSubmit}
        >
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={errors.email ? "error" : ""}
              onChange={this.onChange}
              name="email"
              id="email"
              type="text"
              value={email}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={errors.password ? "error" : ""}
              onChange={this.onChange}
              name="password"
              id="password"
              type="text"
              value={password}
              placeholder="Enter Password"
            />
          </Form.Group>
          <div
            style={{
              left: 2,
              fontSize: "32px",
              position: "relative",
              top: 23
            }}
          >
            <Button
              disabled={isDisabled}
              className="submit-btn"
              role="button"
              type="submit"
            >
              Submit
            </Button>
            <a href="/login" className="btn btn-info" role="button">
              Log In
            </a>
          </div>
        </Form>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signupUser
    },
    dispatch
  );

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Signup)
);
