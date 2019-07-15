import React, { Component } from "react";

import FormInput from "./formInput";
import { registerUser } from "../../services/userService";

import Joi from "joi-browser";
import { toast } from "react-toastify";

class RegisterForm extends Component {
  state = { account: { username: "", password: "", email: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  handleSubmit = e => {
    e.preventDefault();

    try {
      registerUser(this.state.account);
    } catch (ex) {
      console.log(ex.response.data);
      if (ex.response && ex.response.status === 400) {
        const errors = this.state.errors;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      toast.error(ex.response.data);
    }
  };

  validateInput = (id, value) => {
    const inputSchema = { [id]: this.schema[id] };
    const { error } = Joi.validate({ [id]: value }, inputSchema);
    return error ? error.details[0].message : null;
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

  submitAble = () => {
    const { username, password, email } = this.state.account;

    return (
      username.length > 0 &&
      password.length > 0 &&
      email.length > 0 &&
      Object.keys(this.state.errors).length === 0
    );
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
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
          <FormInput
            id="email"
            name="Email"
            onChange={this.handleChange}
            value={this.state.account.email}
            error={this.state.errors.email}
          />
          <button className="btn btn-primary" disabled={!this.submitAble()}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
