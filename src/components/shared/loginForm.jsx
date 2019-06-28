import React, { Component } from "react";

import FormInput from "./formInput";

import Joi from "joi-browser";

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

  render() {
    return (
      <div>
        <h1>Login</h1>
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
