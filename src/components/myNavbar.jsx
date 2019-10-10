import React, { Component } from "react";

import { Link, NavLink, withRouter } from "react-router-dom";
import _ from "lodash";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class MyNavbar extends Component {
  state = {
    dropdownItems: [
      { to: "/my/orders", show: "My Orders" },
      { to: "/admin/orders", show: "Manage Orders" },
      { to: "/products", show: "Manage Products" }
    ]
  };

  getItemCount = cart => {
    if (!cart) return 0;
    return _.sumBy(cart.items, item => item.numberInCart);
  };

  render() {
    const { user, cart } = this.props;
    const itemCount = this.getItemCount(cart);

    return (
      <React.Fragment>
        <Navbar bg="light" fixed="top">
          <Navbar.Brand className="h1">
            <Link to="/">OShop</Link>
          </Navbar.Brand>
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
                {this.state.dropdownItems.map(i => (
                  <NavLink
                    to={i.to}
                    key={i.to}
                    className={
                      this.props.location.pathname === i.to
                        ? "nav-link list-group-item active"
                        : "nav-link list-group-item"
                    }
                  >
                    {i.show}
                  </NavLink>
                ))}
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

export default withRouter(MyNavbar);
