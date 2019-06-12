import React, { Component } from "react";

import ListGroup from "./shared/listGroup";
import Pagination from "./shared/pagination";

import _ from "lodash";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    products: [
      { id: 1, name: "apple", category: "fruit" },
      { id: 2, name: "potato", category: "vegetable" },
      { id: 3, name: "banana", category: "fruit" },
      { id: 4, name: "eggplant", category: "vegetable" },
      { id: 5, name: "orange", category: "fruit" },
      { id: 6, name: "pumpkin", category: "vegetable" },
      { id: 7, name: "pineapple", category: "fruit" },
      { id: 8, name: "corn", category: "vegetable" }
    ],
    categories: ["fruit", "vegetable"],
    selectedCategory: "",
    pageSize: 5,
    selectedPage: 1
  };

  handleCategorySelect = category => {
    this.setState({ selectedCategory: category });
  };

  handlePageSelect = page => {
    this.setState({ selectedPage: page });
  };

  handlePaginate(pageSize, selectedPage, selectedProducts) {
    const startIndex = pageSize * (selectedPage - 1);
    return _(selectedProducts)
      .slice(startIndex, startIndex + pageSize)
      .value();
  }

  render() {
    const selectedProducts = this.state.selectedCategory
      ? this.state.products.filter(
          p => p.category === this.state.selectedCategory
        )
      : this.state.products;

    const paginatedProducts = this.handlePaginate(
      this.state.pageSize,
      this.state.selectedPage,
      selectedProducts
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            onCategorySelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          {paginatedProducts.map(p => (
            <li key={p.name}>
              <Link to={`/products/${p.id}`}>{p.name}</Link>
            </li>
          ))}
          <Pagination
            productsCount={selectedProducts.length}
            pageSize={this.state.pageSize}
            selectedPage={this.state.selectedPage}
            onPageSelect={this.handlePageSelect}
          />
        </div>
      </div>
    );
  }
}

export default Products;
