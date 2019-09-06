import React, { Component } from "react";

import FormInput from "./shared/formInput";
import { saveOrder } from "../services/orderService";

import Joi from "joi-browser";
import { toast } from "react-toastify";

class Shipping extends Component {
  state = {
    shipping: { name: "", address: "", city: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    address: Joi.string()
      .required()
      .label("Address"),
    city: Joi.string()
      .required()
      .label("City")
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      await saveOrder({
        datePlaced: new Date().getTime(),
        shipping: this.state.shipping,
        items: this.props.cart.items.map(i => {
          return {
            category: i.category,
            imageUrl: i.imageUrl,
            name: i.name,
            numberInCart: i.numberInCart,
            numberInStock: i.numberInStock,
            price: i.price
          };
        })
      });
      toast.success(
        "Thank you! We received your order and will process it within the next 24 hours!"
      );
      this.props.onClear(this.props.cart.id);
      this.props.cart.items = [];
      // localStorage.clear();
      window.location = "/";
    } catch (ex) {
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

    const shipping = { ...this.state.shipping };
    shipping[e.currentTarget.id] = e.currentTarget.value;

    this.setState({ shipping, errors });
  };

  submitAble = () => {
    const { name, address, city } = this.state.shipping;

    return (
      name.length > 0 &&
      address.length > 0 &&
      city.length > 0 &&
      Object.keys(this.state.errors).length === 0
    );
  };

  render() {
    const { cart } = this.props;

    return (
      <div>
        <h1>Shipping</h1>
        {cart && (
          <form onSubmit={this.handleSubmit}>
            <FormInput
              id="name"
              name="Name"
              autoFocus={true}
              onChange={this.handleChange}
              value={this.state.shipping.name}
              error={this.state.errors.name}
            />
            <FormInput
              id="address"
              name="Address"
              onChange={this.handleChange}
              value={this.state.shipping.address}
              error={this.state.errors.address}
            />
            <FormInput
              id="city"
              name="City"
              onChange={this.handleChange}
              value={this.state.shipping.city}
              error={this.state.errors.city}
            />
            <button className="btn btn-primary" disabled={!this.submitAble()}>
              Place Order
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Shipping;
