import React from "react";

import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1" href="#">
          Navbar
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
              <Link className="btn btn-outline-success mx-3 " to="/profile">
                Hi, {user.username}
              </Link>
              <Link className="btn btn-outline-success mx-3 " to="/logout">
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
