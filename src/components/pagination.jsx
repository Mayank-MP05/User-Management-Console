import React from 'react';
import '../styles/pagination.style.css';

function Pagination({ activeRowController, maxRows = 5 }) {
  const { activeRow, setactiveRow } = activeRowController;
  const rowExistsArr = [false, false, false, false, false].fill(
    true,
    0,
    maxRows
  );

  return (
    <div className="m-2">
      <nav
        aria-label="Users Page navigation"
        className="d-flex justify-content-center align-items-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className={`page-link ${activeRow === 0 ? 'disabled-page' : ''}`}
              aria-label="First Page"
              onClick={() => setactiveRow(0)}
              disabled={activeRow === 0}
            >
              <span aria-hidden="true">&lt;&lt;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className={`page-link ${activeRow === 0 ? 'disabled-page' : ''}`}
              aria-label="Previous"
              onClick={() => setactiveRow(activeRow > 0 ? activeRow - 1 : 0)}
              disabled={activeRow === 0}
            >
              <span aria-hidden="true">&lt;</span>
            </button>
          </li>
          {rowExistsArr.map((existsFlag, currentIdx) => (
            <li className="page-item" key={currentIdx}>
              {existsFlag ? (
                <button
                  className={`page-link ${
                    currentIdx === activeRow ? 'active-page' : 'eligible-page'
                  }`}
                  onClick={() => setactiveRow(currentIdx)}
                >
                  {currentIdx + 1}
                </button>
              ) : (
                ''
              )}
            </li>
          ))}
          <li className="page-item">
            <button
              className={`page-link ${
                activeRow === maxRows - 1 ? 'disabled-page' : ''
              }`}
              aria-label="Next"
              onClick={() =>
                setactiveRow(
                  activeRow >= maxRows - 1 ? maxRows - 1 : activeRow + 1
                )
              }
              disabled={activeRow === maxRows - 1}
            >
              <span aria-hidden="true">&gt;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className={`page-link ${
                activeRow === maxRows - 1 ? 'disabled-page' : ''
              }`}
              aria-label="Last Page"
              onClick={() => setactiveRow(maxRows - 1)}
              disabled={activeRow === maxRows - 1}
            >
              <span aria-hidden="true">&gt;&gt;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
