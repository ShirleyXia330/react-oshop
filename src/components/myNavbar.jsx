import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class MyNavbar extends Component {
  state = {};

  getItemCount = cart => {
    if (!cart) return 0;
    return _.sumBy(cart.items, item => item.numberInCart);
  };

  render() {
    const { user, cart } = this.props;
    const itemCount = this.getItemCount(cart);

    return (
      <React.Fragment>
        <Navbar bg="light" expand="md" fixed="top">
          <Navbar.Brand className="h1">OShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                <i className="fa fa-leaf fa-lg" id="home" />
              </Link>
              <Link className="nav-link" to="/cart">
                <i className="fa fa-cart-plus fa-lg" id="cart" />
                <span className="badge badge-warning badge-pill">
                  {itemCount}
                </span>
              </Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {!user && (
              <React.Fragment>
                <Link className="btn btn-outline-success mx-3 " to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success mx-3 " to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user && (
              <NavDropdown
                title={`Hi, ${user.username}`}
                id="basic-nav-dropdown"
              >
                <NavLink to="/my/orders" className="nav-link">
                  My Orders
                </NavLink>
                <NavLink to="/admin/orders" className="nav-link">
                  Manage Orders
                </NavLink>
                <NavLink to="/products" className="nav-link">
                  Manage Products
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default MyNavbar;
