import React from "react";

import ShippingForm from "./shippingForm";
import ShippingOrderSummary from "./ShippingOrderSummary";

const Shipping = ({ cart, onClear }) => {
  return (
    <div>
      <h1>Shipping</h1>
      {cart && (
        <div className="row">
          <div className="col-6">
            <ShippingForm cart={cart} onClear={onClear}></ShippingForm>
          </div>
          <div className="col-6">
            <ShippingOrderSummary cart={cart}></ShippingOrderSummary>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;
