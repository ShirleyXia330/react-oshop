import React, { Component } from "react";
import _ from "lodash";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";

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
              {cart.items[0] && (
                <button className="btn btn-light btn-sm" onClick={onClear}>
                  Clear Shopping Cart
                </button>
              )}
            </p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "200px" }} />
                  <th>Product</th>
                  <th style={{ width: "200px", textAlign: "center" }}>
                    Quantity
                  </th>
                  <th id="text-right">Price</th>
                </tr>
              </thead>
              {/* {cart.items && ( */}
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
                    <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                    <td>
                      <QuantityButton
                        product={item}
                        numberInCart={item.numberInCart}
                        onDecrement={onDecrement}
                        onIncrement={onIncrement}
                      />
                    </td>
                    <td id="text-right">
                      <Currency
                        quantity={item.numberInCart * item.price}
                        currency="AUD"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* )} */}
              <tfoot>
                <tr>
                  <th>Total:</th>
                  <th />
                  <th />
                  <th id="text-right">
                    <Currency
                      quantity={this.getTotalPrice(cart)}
                      currency="AUD"
                    />
                  </th>
                </tr>
              </tfoot>
            </table>
            {cart.items[0] && (
              <Link className="btn btn-success" to="/shipping">
                Check Out
              </Link>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
