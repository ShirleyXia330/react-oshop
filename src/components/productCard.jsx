import React from "react";

import { Card } from "react-bootstrap";

const ProductCard = ({ src, name, price, onClick }) => {
  return (
    <div className="col-md-6 col-sm-12 card-div">
      <Card>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">A$ {price}</Card.Subtitle>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <button className="btn btn-success btn-block">Add to cart</button>
          <div className="row">
            <button className="btn btn-success col-2">-</button>
            <div className="col text-center">1 in cart</div>
            <button className="btn btn-success col-2">+</button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductCard;
