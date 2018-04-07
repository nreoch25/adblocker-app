import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authentication";
import requireAuth from "./hoc/requireAuth";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }
  render() {
    return <div>...Logging you out</div>;
  }
}

export default requireAuth(withRouter(connect(null, { logoutUser })(Logout)));
