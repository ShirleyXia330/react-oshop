import React, { Component } from "react";

import { getOrders, getOrdersByUser } from "../services/orderService";
import { getUser } from "../services/authService";

import { toast } from "react-toastify";

class Orders extends Component {
  state = {};

  async getOrders() {
    try {
      if (this.props.location.pathname === "/my/orders") {
        const { data: orders } = await getOrdersByUser(getUser()._id);
        this.setState({ orders });
      } else {
        const { data: orders } = await getOrders();
        this.setState({ orders });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.setState({ orders: [] });
      toast.error(ex.response.data);
    }
  }

  componentDidMount() {
    // let orders;
    this.getOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getOrders();
    }
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders &&
              this.state.orders.map(o => (
                <tr key={o._id}>
                  <td>{o.shipping.name}</td>
                  <td>{o.datePlaced}</td>
                  <td>
                    <button className="btn btn-success">View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
