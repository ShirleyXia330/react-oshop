import React from "react";

//Still could be   --Chapter5
const ListGroup = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <ul className="list-group">
      {categories.map(category => (
        <li
          className={
            category.name === selectedCategory
              ? "list-group-item active"
              : "list-group-item"
          }
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          style={{ cursor: "pointer" }}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
