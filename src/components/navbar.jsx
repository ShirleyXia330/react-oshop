import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import _ from "lodash";

class NavBar extends Component {
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <div className="container">
            <span className="navbar-brand mb-0 h1" href="#">
              OShop
            </span>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li> */}
                <li>
                  <Link className="nav-link" to="/cart">
                    <i className="fa fa-cart-plus fa-lg" />
                    <span className="badge badge-warning badge-pill">
                      {itemCount}
                    </span>
                  </Link>
                </li>
              </ul>

              {!user && (
                <React.Fragment>
                  <Link className="btn btn-outline-success mx-3 " to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-success mx-3 "
                    to="/register"
                  >
                    Register
                  </Link>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <MDBDropdown>
                    <MDBDropdownToggle caret color="success">
                      Hi, {user.username}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                      <MDBDropdownItem id="dropdownItem">
                        <Link to="/my/orders">My Orders</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem id="dropdownItem">
                        <Link to="/admin/orders">Manage Orders</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem id="dropdownItem">
                        <Link to="/products">Manage Products</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem id="dropdownItem">
                        <Link to="/logout">Logout</Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  {/* <Link
                    className="btn btn-outline-success mx-3 dropdownItem"
                    to="/logout"
                  >
                    Logout
                  </Link> */}
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
