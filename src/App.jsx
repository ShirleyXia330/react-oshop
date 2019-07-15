import React, { Component } from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navBar";
import Products from "./components/products";
import Product from "./components/product";
import NotFound from "./components/notFound";
import LoginForm from "./components/shared/loginForm";
import RegisterForm from "./components/shared/registerForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="content" style={{ margin: "20px" }}>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/products/:id" component={Product} />
            <Route
              path="/products"
              render={props => <Products sortBy="id" {...props} />}
            />
            <Route path="/" exact component={Products} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
