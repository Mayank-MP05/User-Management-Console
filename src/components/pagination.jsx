import React from 'react';

function Pagination() {
  return (
    <div className="m-2">
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center align-items-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&lt;&lt;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&lt;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link disabled" disabled>
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&gt;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" aria-label="Next">
              <span aria-hidden="true">&gt;&gt;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
