import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const selectedSort = { ...this.props.selectedSort };
    if (selectedSort.path === path)
      selectedSort.order = selectedSort.order === "asc" ? "desc" : "asc";
    else {
      selectedSort.path = path;
      selectedSort.order = "asc";
    }
    this.props.onSort(selectedSort);
  };

  renderSortIcon = path => {
    if (path !== this.props.selectedSort.path) return null;

    if (this.props.selectedSort.order === "asc")
      return <i className="fa fa-sort-asc" style={{ marginLeft: "5px" }} />;
    return <i className="fa fa-sort-desc" style={{ marginLeft: "5px" }} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              style={{ textTransform: "capitalize", cursor: "pointer" }}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.path}
              {this.renderSortIcon(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
