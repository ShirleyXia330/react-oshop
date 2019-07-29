import React from "react";

import { Link } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1" href="#">
          OShop
        </span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/cart">
                <i className="fa fa-cart-plus fa-lg" />
                <span className="badge badge-warning badge-pill">3</span>
              </Link>
            </li>
          </ul>

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
            <React.Fragment>
              <MDBDropdown>
                <MDBDropdownToggle caret color="success">
                  Hi, {user.username}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem id="dropdownItem">My Orders</MDBDropdownItem>
                  <MDBDropdownItem id="dropdownItem">
                    Manage Orders
                  </MDBDropdownItem>
                  <MDBDropdownItem id="dropdownItem">
                    Manage Products
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <Link
                className="btn btn-outline-success mx-3 dropdownItem"
                to="/logout"
              >
                Logout
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
