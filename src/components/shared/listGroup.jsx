import React from "react";

//Still could be   --Chapter5
const ListGroup = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <ul className="list-group">
      {categories.map(category => (
        <li
          className={
            category === selectedCategory
              ? "list-group-item active"
              : "list-group-item"
          }
          key={category}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
