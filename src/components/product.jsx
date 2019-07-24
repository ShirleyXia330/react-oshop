import React, { Component } from "react";

import FormInput from "./shared/formInput";
import FormSelect from "./shared/formSelect";
import { getCategories } from "../services/categoryService";
import { getProduct, saveProduct } from "../services/productService";

import Joi from "joi-browser";
import { toast } from "react-toastify";

class Product extends Component {
  state = {
    data: {
      name: "",
      category: "",
      price: 0,
      number: 0
    },
    categories: [],
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    category: Joi.string().label("Category"),
    price: Joi.number()
      .min(0)
      .required()
      .label("Price"),
    number: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number in Stock")
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    try {
      if (this.props.match.params.id === "new") return;
      const { data } = await getProduct(this.props.match.params.id);
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      await saveProduct(this.state.data).then(res => console.log(res.data));
      this.props.history.push("/");
      // window.location = "/";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  validateInput = (id, value) => {
    const inputSchema = { [id]: this.schema[id] };
    const { error } = Joi.validate({ [id]: value }, inputSchema);
    return error ? error.details[0].message : null;
  };

  submitAble = () => {
    const { name, number, price } = this.state.data;

    return (
      name.length > 0 &&
      number > 0 &&
      price > 0 &&
      Object.keys(this.state.errors).length === 0
    );
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const inputError = this.validateInput(
      e.currentTarget.id,
      e.currentTarget.value.trim()
    );

    if (!inputError) delete errors[e.currentTarget.id];
    else errors[e.currentTarget.id] = inputError;

    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;

    this.setState({ data, errors });
  };

  render() {
    return (
      <div>
        {/* <h1> {this.props.match.params.id}</h1> */}
        <h1>Product Information </h1>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="name"
            name="Name"
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.data.name}
            error={this.state.errors.name}
          />
          <FormSelect
            id="category"
            name="Category"
            options={this.state.categories}
            onChange={this.handleChange}
            value={this.state.data.category}
            error={this.state.errors.category}
          />
          <FormInput
            id="price"
            name="Price"
            type="number"
            onChange={this.handleChange}
            value={this.state.data.price}
            error={this.state.errors.price}
          />
          <FormInput
            id="number"
            name="Number In Stock"
            type="number"
            onChange={this.handleChange}
            value={this.state.data.number}
            error={this.state.errors.number}
          />
          <button className="btn btn-primary" disabled={!this.submitAble()}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Product;
