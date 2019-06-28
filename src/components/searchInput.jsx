import React from "react";

const SearchBox = ({ onChange }) => {
  return (
    <input
      id="query"
      type="text"
      className="form-control my-3"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
