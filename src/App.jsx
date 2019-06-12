import React, { Component } from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Products from "./components/products";
import Product from "./components/product";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="content">
          <Switch>
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
