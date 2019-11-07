import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Button from "react-bootstrap/Button";


import Form from "react-bootstrap/Form";


function validate(name, email, password) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    email: email.length === 0,
    password: password.length === 0
  };
}

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
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

    // const user = this.state;
    // this.props.signupUser(user, () => this.props.history.push("/login"));
  }

  canBeSubmitted() {
    const errors = validate(
      this.state.name,
      this.state.email,
      this.state.password

    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(
      this.state.name,
      this.state.email,
      this.state.password

    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const { name, email, password } = this.state;
    console.log(this.state);
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={errors.name ? "error" : ""}
              onChange={this.onChange}
              name="name"
              id="name"
              type="text"
              value={name}
              placeholder="Enter Name"
            />
          </Form.Group>

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


export default withRouter(Signup)
