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
          <div className="row">
            <div
              className="col-md-10"
              style={{
                border: "1px solid rgba(0,0,0,.125)",
                borderRadius: "5px"
              }}
            >
              <div className="row" style={{ padding: "20px" }}>
                <div className="col-12 col-md-8">
                  You have {this.getItemCount(cart)} items in your shopping
                  cart.
                </div>
                <div className="col-6 col-md-4">
                  {cart.items[0] && (
                    <button
                      className="btn btn-light btn-sm"
                      style={{ width: "max-content" }}
                      onClick={onClear}
                    >
                      Clear Shopping Cart
                    </button>
                  )}
                </div>
              </div>
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
                      <td
                        style={{
                          verticalAlign: "middle",
                          padding: "5px 0px 5px 5px"
                        }}
                      >
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
                          verticalAlign: "middle",
                          padding: "5px 8px 5px 0px"
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                          minWidth: "130px"
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
