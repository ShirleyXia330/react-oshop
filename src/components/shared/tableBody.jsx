import React, { Component } from "react";

import { Link } from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
  renderItem = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    return (
      <tbody>
        {this.props.items.map(item => (
          <tr key={item.id}>
            {this.props.columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderItem(item, column)}
              </td>
            ))}
          </tr>
        ))}
        {/* {products.map(p => (
          <tr key={p.id}>
            <th>{p.id}</th>
            <td>
              <Link to={`/products/${p.id}`}>{p.name}</Link>
            </td>
            <td>{p.category}</td>
            <td>
              <Like liked={p.liked} onClick={() => onLike(p)} />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))} */}
      </tbody>
    );
  }
}

export default TableBody;
