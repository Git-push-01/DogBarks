import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
  };
}

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user, this.props.history.push("/mapContainer"));
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    return !isDisabled;
  }

  render() {
    // console.log(this.state);
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    const { email, password } = this.state;

    return (
      <div>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 10 + "px",
          }}
          className="login"
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
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={errors.password ? "error" : ""}
              onChange={this.onChange}
              name="password"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
            />
          </Form.Group>
          <div
            style={{
              left: 2,
              fontSize: "32px",
              position: "relative",
              top: 23,
            }}
          >
            <Button
              disabled={isDisabled}
              className="submit-btn"
              role="button"
              type="submit"
            >
              Log In
            </Button>

            <Button
              href="/signup"
              text-align="center"
              className="btn btn-info"
              role="button"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );

export default withRouter(connect(null, mapDispatchToProps)(Login));
