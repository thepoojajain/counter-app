import React, { Component } from 'react';

const NavBar = ({totalCounetrs}) => {
  return (<nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar <span className="badge badge-pill badge-secondary">{totalCounetrs}</span>
          </a>
        </div>
      </nav>);
};

export default NavBar;

