import React, { Component } from "react";

import ListGroup from "./shared/listGroup";
import Pagination from "./shared/pagination";
import ProductsTable from "./productsTable";

import _ from "lodash";

class Products extends Component {
  state = {
    products: [
      { id: 1, name: "apple", category: "Fruit", liked: false },
      { id: 2, name: "potato", category: "Vegetable", liked: false },
      { id: 3, name: "banana", category: "Fruit", liked: false },
      { id: 4, name: "eggplant", category: "Vegetable", liked: false },
      { id: 5, name: "orange", category: "Fruit", liked: false },
      { id: 6, name: "pumpkin", category: "Vegetable", liked: false },
      { id: 7, name: "pineapple", category: "Fruit", liked: false },
      { id: 8, name: "corn", category: "Vegetable", liked: false }
    ],
    categories: ["All", "Fruit", "Vegetable"],
    selectedCategory: "All",
    pageSize: 5,
    selectedPage: 1,
    selectedSort: { path: "name", order: "asc" }
  };

  handleCategorySelect = category => {
    if (this.state.selectedCategory === category)
      this.setState({ selectedCategory: "All", selectedPage: 1 });
    else this.setState({ selectedCategory: category, selectedPage: 1 });
  };

  handlePageSelect = page => {
    this.setState({ selectedPage: page });
  };

  handleSortSelect = selectedSort => {
    this.setState({ selectedSort });
  };

  handlePaginate = (pageSize, selectedPage, selectedProducts) => {
    const startIndex = pageSize * (selectedPage - 1);
    return _(selectedProducts)
      .slice(startIndex, startIndex + pageSize)
      .value();
  };

  handleDelete = id => {
    const products = this.state.products.filter(p => p.id !== id);
    this.setState({ products });
    // console.log("Delete:", this.state.products);
  };

  handleLike = product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    products[index].liked = !products[index].liked;
    this.setState({ products });
  };

  conditionalRender(count) {
    if (count === 0) return <p>There is no product.</p>;
    if (count === 1) return <p>There is one product.</p>;
    return <p>There are {count} products</p>;
  }

  render() {
    const selectedProducts =
      this.state.selectedCategory === "All"
        ? this.state.products
        : this.state.products.filter(
            p => p.category === this.state.selectedCategory
          );

    const sortedProducts = _.orderBy(
      selectedProducts,
      [this.state.selectedSort.path],
      [this.state.selectedSort.order]
    );

    const paginatedProducts = this.handlePaginate(
      this.state.pageSize,
      this.state.selectedPage,
      sortedProducts
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
          {this.conditionalRender(selectedProducts.length)}
          <ProductsTable
            products={paginatedProducts}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSortSelect}
            selectedSort={this.state.selectedSort}
          />
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
