import React, { Component } from "react";

import ListGroup from "./shared/listGroup";
import Pagination from "./shared/pagination";
import ProductsTable from "./productsTable";
import SearchInput from "./searchInput";
import { getProducts, deleteProduct } from "../services/productService";
import { getUser } from "../services/authService";

import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Products extends Component {
  state = {
    products: [],
    categories: ["All", "Fruit", "Vegetable"],
    selectedCategory: "All",
    pageSize: 5,
    selectedPage: 1,
    selectedSort: { path: "name", order: "asc" },
    searchQuery: ""
  };

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

  handleDelete = async id => {
    const originalProducts = [...this.state.products];
    const products = this.state.products.filter(p => p._id !== id);
    this.setState({ products });

    try {
      await deleteProduct(id);
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
      toast.error(ex.response.data);

      this.setState({ products: originalProducts });
    }
  };

  handleLike = product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    products[index].liked = !products[index].liked;
    this.setState({ products });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query.trim(),
      selectedCategory: "All",
      selectedPage: 1
    });
  };

  conditionalRender(count) {
    if (count === 0) return <p>There is no product.</p>;
    if (count === 1) return <p>There is one product.</p>;
    return <p>There are {count} products</p>;
  }

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  render() {
    const {
      selectedCategory,
      products,
      selectedSort,
      pageSize,
      selectedPage,
      categories,
      searchQuery
    } = this.state;
    // const { user } = this.props;
    // console.log(this.props);

    let selectedProducts = {};
    if (searchQuery) {
      selectedProducts = products.filter(p =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      selectedProducts =
        selectedCategory === "All"
          ? products
          : products.filter(p => p.category === selectedCategory);
    }

    const sortedProducts = _.orderBy(
      selectedProducts,
      [selectedSort.path],
      [selectedSort.order]
    );

    const paginatedProducts = this.handlePaginate(
      pageSize,
      selectedPage,
      sortedProducts
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          {getUser() && (
            <Link
              to="/products/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Product
            </Link>
          )}
          {this.conditionalRender(selectedProducts.length)}
          <SearchInput onChange={this.handleSearch} />
          <ProductsTable
            products={paginatedProducts}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSortSelect}
            selectedSort={selectedSort}
          />
          <Pagination
            productsCount={selectedProducts.length}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageSelect={this.handlePageSelect}
          />
        </div>
      </div>
    );
  }
}

export default Products;
