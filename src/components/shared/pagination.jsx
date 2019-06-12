import React from "react";

import _ from "lodash";

const Pagination = ({
  productsCount,
  pageSize,
  selectedPage,
  onPageSelect
}) => {
  const pageCount = Math.ceil(productsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map(page => (
          <li
            key={page}
            className={page === selectedPage ? "page-item active" : "page-item"}
          >
            <button
              className="page-link"
              onClick={() => {
                onPageSelect(page);
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
