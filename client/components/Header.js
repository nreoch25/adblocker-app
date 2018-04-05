import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          ADBlocker APP
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/upload">
              Upload <i className="fa fa-upload" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inventory">
              Inventory <i className="fa fa-sitemap" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
