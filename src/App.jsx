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
import {
  createCart,
  getCart,
  Increment,
  Decrement
} from "./services/shoppingCartService";

class App extends Component {
  state = {};

  handleIncrement = async product => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = await createCart();
      localStorage.setItem("cartId", cartId);
    }
    const { data: cart } = await Increment(cartId, product);
    this.setState({ cart });
  };

  handleDecrement = async product => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = await createCart();
      localStorage.setItem("cartId", cartId);
    }
    const { data: cart } = await Decrement(cartId, product);
    this.setState({ cart });
  };

  async componentDidMount() {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const { data } = await getCart(cartId);
      this.setState({ cart: data[0] });
    }
  }

  render() {
    const cart = this.state.cart;

    return (
      <React.Fragment>
        {/* <script src="https://unpkg.com/react/umd/react.production.min.js" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        /> */}

        <ToastContainer />
        <NavBar user={getUser()} cart={cart} />
        <div className="content" style={{ margin: "20px" }}>
          <Switch>
            <Route path="/cart" component={ShoppingCart} />
            <Route
              path="/home"
              render={() => (
                <Home
                  cart={cart}
                  onIncrement={this.handleIncrement}
                  onDecrement={this.handleDecrement}
                />
              )}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/products/:id" component={Product} />
            <Route path="/products" render={props => <Products {...props} />} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/home" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
