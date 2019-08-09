import React from "react";

import { Card } from "react-bootstrap";
import QuantityButton from "./shared/quantityButton";

const ProductCard = ({ product, onIncrement, onDecrement, numberInCart }) => {
  return (
    <div className="col-md-6 col-sm-12 card-div">
      <Card>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {product.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            A$ {product.price}
          </Card.Subtitle>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {numberInCart !== 0 && (
            <QuantityButton
              product={product}
              numberInCart={numberInCart}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          )}
          {numberInCart === 0 && (
            <button
              className="btn btn-success btn-block"
              onClick={() => onIncrement(product)}
            >
              Add to cart
            </button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductCard;
