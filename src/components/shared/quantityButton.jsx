import React from "react";

const QuantityButton = ({
  product,
  onIncrement,
  onDecrement,
  numberInCart
}) => {
  return (
    <div className="row">
      <button
        className="btn btn-success col-2"
        onClick={() => onDecrement(product)}
      >
        -
      </button>
      <div className="col text-center">{numberInCart} in cart</div>
      <button
        className="btn btn-success col-2"
        onClick={() => onIncrement(product)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
