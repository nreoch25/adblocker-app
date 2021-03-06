import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  checkAdmin() {
    if (this.props.user && this.props.user.type === "admin") {
      return (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="admindropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            href="#"
          >
          Admin
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="admindropdown"
          >
            <Link to="/signup" className="dropdown-item">
              Create User
            </Link>
          </div>
        </li>
      );
    }
  }
  renderLinks() {
    if(this.props.authenticated === true) {
      console.log("USER AUTHENTICATED", this.props.user);
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About <i className="fa fa-info-circle" />
            </Link>
          </li>
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
          {this.checkAdmin()}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userdropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
            >
              {this.props.user.username}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userdropdown"
            >
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      );
    } else {
      console.log("USER UNAUTHENTICATED");
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About <i className="fa fa-info-circle" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Login <i className="fa fa-sign-in" />
            </Link>
          </li>
        </ul>
      );
    }

  }
  render() {
    console.log("RENDER HEADER");
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          ADBlocker APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#appNav"
          aria-controls="appNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="appNav">
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, null)(Header);
