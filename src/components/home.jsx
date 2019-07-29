import React, { Component } from "react";

import ListGroup from "./shared/listGroup";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "./productCard";

class Home extends Component {
  state = { products: [], categories: [], selectedCategory: "All" };

  handleCategorySelect = category => {
    if (this.state.selectedCategory === category)
      this.setState({ selectedCategory: "All", selectedPage: 1 });
    else
      this.setState({
        selectedCategory: category,
        selectedPage: 1,
        searchQuery: ""
      });
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data } = await getCategories();
    const categories = [{ _id: "", name: "All" }, ...data];
    this.setState({ products, categories });
  }

  render() {
    const { selectedCategory, categories } = this.state;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={this.handleCategorySelect}
          />
        </div>
        <div className="col-9">
          <div className="row">
            {this.state.products.map(p => (
              <ProductCard
                key={p._id}
                name={p.name}
                price={p.price}
                src="http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
