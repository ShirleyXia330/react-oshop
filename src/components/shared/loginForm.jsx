import React, { Component } from "react";

import FormInput from "./formInput";
import { login } from "../../services/authService";
import { getUser } from "../../services/authService";

import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

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

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { username, password } = this.state.account;
      await login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const account = { username: "", password: "" };
        this.setState({ account });
        toast.error(ex.response.data);
      }
    }
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
    if (getUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>{" "}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="username"
            name="Username"
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.account.username}
            error={this.state.errors.username}
          />
          <FormInput
            id="password"
            name="Password"
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
