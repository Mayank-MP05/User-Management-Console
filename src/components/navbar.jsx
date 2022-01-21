import React from 'react';

function Navbar({ searchQueryStr, setsearchQueryStr }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">GeekTrust Users</a>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            value={searchQueryStr}
            onChange={(e) => setsearchQueryStr(e.target.value)}
            placeholder="Search user ..."
            aria-label="Search"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
