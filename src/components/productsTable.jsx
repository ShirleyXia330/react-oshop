import React, { Component } from "react";

import TableHeader from "./shared/tableHeader";
import TableBody from "./shared/tableBody";
import Like from "./shared/like";

import { Link } from "react-router-dom";

class ProductsTable extends Component {
  columns = [
    // { path: "id" },
    {
      path: "name",
      content: product => (
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      )
    },
    { path: "category" },
    { path: "price" },
    { path: "number", label: "number in stock" },
    {
      key: "like",
      content: product => (
        <Like
          liked={product.liked}
          onClick={() => this.props.onLike(product)}
        />
      )
    },
    {
      key: "delete",
      content: product => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(product._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { products, onSort, selectedSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          onSort={onSort}
          selectedSort={selectedSort}
          columns={this.columns}
        />
        <TableBody items={products} columns={this.columns} />
      </table>
    );
  }
}

export default ProductsTable;
