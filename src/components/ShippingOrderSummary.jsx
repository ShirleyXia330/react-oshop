import React from "react";

import Currency from "react-currency-formatter";
import _ from "lodash";

const ShippingOrderSummary = ({ cart }) => {
  const totalPrice = _.sumBy(
    cart.items,
    item => item.price * item.numberInCart
  );
  const itemCount = _.sumBy(cart.items, item => item.numberInCart);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Order Summary</h4>
        <p className="card-text">
          You have {itemCount} items in your shopping cart.
        </p>
        <ul className="list-group list-group-flush">
          {cart.items.map(i => (
            <li className="list-group-item" key={i.name}>
              {i.numberInCart} x {i.name}
              <div className="float-right">
                <Currency quantity={i.numberInCart * i.price} currency="AUD" />
              </div>
            </li>
          ))}
          <li className="list-group-item font-weight-bold">
            Total:
            <div className="float-right">
              <Currency quantity={totalPrice} currency="AUD" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingOrderSummary;
