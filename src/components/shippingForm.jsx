import React, { Component } from "react";

import FormInput from "./shared/formInput";
import { saveOrder } from "../services/orderService";
import { getUser } from "../services/authService";

import { toast } from "react-toastify";
import Joi from "joi-browser";
import _ from "lodash";

class ShippingForm extends Component {
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

  getTotalPrice = cart => {
    return _.sumBy(cart.items, item => item.price * item.numberInCart);
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { cart, onClear } = this.props;
    try {
      await saveOrder({
        userId: getUser()._id,
        datePlaced: new Date().getTime() - 7200000,
        shipping: this.state.shipping,
        items: cart.items,
        totalPrice: this.getTotalPrice(cart)
      });
      onClear(cart.id);
      cart.items = [];
      window.location = "/success";
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
    const { shipping, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormInput
          id="name"
          name="Name"
          autoFocus={true}
          onChange={this.handleChange}
          value={shipping.name}
          error={errors.name}
        />
        <FormInput
          id="address"
          name="Address"
          onChange={this.handleChange}
          value={shipping.address}
          error={errors.address}
        />
        <FormInput
          id="city"
          name="City"
          onChange={this.handleChange}
          value={shipping.city}
          error={errors.city}
        />
        <button className="btn btn-primary" disabled={!this.submitAble()}>
          Place Order
        </button>
      </form>
    );
  }
}

export default ShippingForm;
