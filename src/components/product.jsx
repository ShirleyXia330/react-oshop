import React, { Component } from "react";

class Product extends Component {
  handleSave = () => {
    this.props.history.replace("/products");
  };

  render() {
    return (
      <div>
        <h1>ID: {this.props.match.params.id}</h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default Product;
