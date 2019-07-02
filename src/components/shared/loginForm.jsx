import React, { Component } from "react";

import FormInput from "./formInput";

import Joi from "joi-browser";
import axios from "axios";

class LoginForm extends Component {
  state = { account: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validateInput = (id, value) => {
    const inputSchema = { [id]: this.schema[id] };
    const { error } = Joi.validate({ [id]: value }, inputSchema);
    return error ? error.details[0].message : null;
  };

  submitAble = () => {
    const { username, password } = this.state.account;

    return (
      username.length > 0 &&
      password.length > 0 &&
      Object.keys(this.state.errors).length === 0
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state.account, this.state.errors);

    const serverport = {
      username: this.state.account.username,
      password: this.state.account.password
    };
    axios
      .post("http://localhost:4000/serverport/add", serverport)
      .then(res => console.log(res.data));
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const inputError = this.validateInput(
      e.currentTarget.id,
      e.currentTarget.value.trim()
    );

    if (!inputError) delete errors[e.currentTarget.id];
    else errors[e.currentTarget.id] = inputError;

    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;

    this.setState({ account, errors });
  };

  handleTest = () => {
    axios
      .get("http://localhost:4000/serverport")
      .then(response => {
        const account = { ...this.state.account };
        account.username = response.data[0].username;
        account.password = response.data[0].password;
        this.setState({ account });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>{" "}
        <button className="btn btn-primary" onClick={this.handleTest}>
          Get
        </button>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="username"
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.account.username}
            error={this.state.errors.username}
          />
          <FormInput
            id="password"
            onChange={this.handleChange}
            value={this.state.account.password}
            error={this.state.errors.password}
          />
          <button className="btn btn-primary" disabled={!this.submitAble()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
