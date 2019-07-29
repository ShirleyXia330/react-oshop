import React, { Component } from "react";

import TableHeader from "./shared/tableHeader";
import TableBody from "./shared/tableBody";
// import Like from "./shared/like";
import { getUser } from "../services/authService";

import { Link } from "react-router-dom";

class ProductsTable extends Component {
  columns = [
    {
      path: "name",
      content: product => (
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      )
    },
    { path: "category" },
    { path: "price" },
    { path: "number", label: "number in stock" }
  ];

  // likeColumn = {
  //   key: "like",
  //   content: product => (
  //     <Like liked={product.liked} onClick={() => this.props.onLike(product)} />
  //   )
  // };

  deleteColumn = {
    key: "delete",
    content: product => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(product._id)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();

    const user = getUser();
    // if (user) this.columns.push(this.likeColumn);
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

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
