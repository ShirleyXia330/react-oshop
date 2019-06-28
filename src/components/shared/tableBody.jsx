import React, { Component } from "react";

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
      </tbody>
    );
  }
}

export default TableBody;
