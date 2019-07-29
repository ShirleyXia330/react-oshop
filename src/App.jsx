import React, { Component } from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navbar";
import Products from "./components/products";
import Product from "./components/product";
import NotFound from "./components/notFound";
import LoginForm from "./components/shared/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/shared/registerForm";
import ProtectedRoute from "./components/shared/protectedRoute";
import ShoppingCart from "./components/shoppingCart";
import Home from "./components/home";

import { getUser } from "./services/authService";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <script src="https://unpkg.com/react/umd/react.production.min.js" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <ToastContainer />
        <NavBar user={getUser()} />
        <div className="content" style={{ margin: "20px" }}>
          <Switch>
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/products/:id" component={Product} />
            <Route path="/products" render={props => <Products {...props} />} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
