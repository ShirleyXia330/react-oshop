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
import { getUser } from "./services/authService";
import ProtectedRoute from "./components/shared/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content" style={{ margin: "20px" }}>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/products/:id" component={Product} />
            {/* <Route
              path="/products"
              render={props => <Products {...props} user={user} />}
            /> */}
            <Route path="/products" render={props => <Products {...props} />} />
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
