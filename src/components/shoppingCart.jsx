import React, { Component } from "react";
import _ from "lodash";

import QuantityButton from "./shared/quantityButton";

class ShoppingCart extends Component {
  state = {};

  getItemCount = cart => {
    if (!cart) return 0;

    return _.sumBy(cart.items, item => item.numberInCart);
  };

  getTotalPrice = cart => {
    if (!cart) return 0;

    return _.sumBy(cart.items, item => item.price * item.numberInCart);
  };

  render() {
    const { onIncrement, onDecrement, cart, onClear } = this.props;

    return (
      <React.Fragment>
        <h1>Shopping Cart</h1>
        {cart && (
          <div className="row col-10">
            <p>
              You have {this.getItemCount(cart)} items in your shopping cart.
            </p>
            <button className="btn btn-success" onClick={onClear}>
              Clear Shopping Cart
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th />
                  <th>Product</th>
                  <th style={{ width: "200px", textAlign: "center" }}>
                    Quantity
                  </th>
                  <th id="text-right">Price</th>
                </tr>
              </thead>
              {cart.items && (
                <tbody>
                  {cart.items.map(item => (
                    <tr key={cart.id + item._id}>
                      <td>
                        <div
                          className="background-image"
                          id="thumbnail"
                          style={{
                            backgroundImage: "url(" + item.imageUrl + ")"
                          }}
                        />
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {item.name}
                      </td>
                      <td>
                        <QuantityButton
                          product={item}
                          numberInCart={item.numberInCart}
                          onDecrement={onDecrement}
                          onIncrement={onIncrement}
                        />
                      </td>
                      <td id="text-right">
                        *{item.price}= A${item.numberInCart * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
              <tfoot>
                <tr>
                  <th>Total Price:</th>
                  <th />
                  <th />
                  <th id="text-right">A${this.getTotalPrice(cart)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
