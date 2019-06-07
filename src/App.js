import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/navBar";
import Products from "./components/products";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Products />
      </React.Fragment>
    );
  }
}

export default App;
