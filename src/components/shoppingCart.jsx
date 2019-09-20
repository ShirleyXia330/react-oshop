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
          <div
            className="row col-10"
            style={{
              border: "1px solid rgba(0,0,0,.125)",
              borderRadius: "5px"
            }}
          >
            <p style={{ padding: "20px" }}>
              You have {this.getItemCount(cart)} items in your shopping cart.
              {cart.items[0] && (
                <button
                  className="btn btn-light btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                  onClick={onClear}
                >
                  Clear Shopping Cart
                </button>
              )}
            </p>
            <table className="table table-striped" style={{ margin: "0px" }}>
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
                    <td style={{ verticalAlign: "middle" }}>
                      <div
                        className="background-image"
                        id="thumbnail"
                        style={{
                          backgroundImage: "url(" + item.imageUrl + ")"
                        }}
                      />
                    </td>
                    <td
                      style={{
                        textTransform: "capitalize",
                        verticalAlign: "middle"
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textTransform: "capitalize"
                      }}
                    >
                      <QuantityButton
                        product={item}
                        numberInCart={item.numberInCart}
                        onDecrement={onDecrement}
                        onIncrement={onIncrement}
                      />
                    </td>
                    <td id="text-right" style={{ verticalAlign: "middle" }}>
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
              <Link
                className="btn btn-success"
                to="/shipping"
                style={{ margin: "6px" }}
              >
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
