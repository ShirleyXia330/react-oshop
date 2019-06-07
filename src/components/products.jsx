import React, { Component } from "react";

import ListGroup from "./shared/listGroup";
import Pagination from "./shared/pagination";

import _ from "lodash";

class Products extends Component {
  state = {
    products: [
      { name: "apple", category: "fruit" },
      { name: "potato", category: "vegetable" },
      { name: "banana", category: "fruit" },
      { name: "eggplant", category: "vegetable" },
      { name: "orange", category: "fruit" },
      { name: "pumpkin", category: "vegetable" },
      { name: "pineapple", category: "fruit" },
      { name: "corn", category: "vegetable" }
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
            <li key={p.name}>{p.name}</li>
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
