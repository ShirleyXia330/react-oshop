import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import Currency from "react-currency-formatter";

const OrderModal = ({ order }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <React.Fragment>
      <Button
        className="btn btn-success"
        variant="primary"
        onClick={() => setShow(true)}
      >
        View
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-65w no-border"
      >
        <Modal.Header closeButton>
          <Modal.Title>Items Ordered</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0px 6px" }}>
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
            {order.items && (
              <tbody>
                {order.items.map(item => (
                  <tr key={item._id}>
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
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {item.numberInCart}
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
            )}
            <tfoot>
              <tr>
                <th>Total:</th>
                <th />
                <th />
                <th id="text-right">
                  <Currency quantity={order.totalPrice} currency="AUD" />
                </th>
              </tr>
              <tr>
                <th>Shipping Address:</th>
                <td colspan="3">{order.shipping.address}</td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-success"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default OrderModal;
