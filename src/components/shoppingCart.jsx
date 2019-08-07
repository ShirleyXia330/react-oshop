import React, { Component } from "react";

class ShoppingCart extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Shopping Cart</h1>
        <p>You have 3 items in your shopping cart.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
