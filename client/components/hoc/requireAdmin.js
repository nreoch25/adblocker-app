import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { currentUser } from "../../actions/authentication";

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      this.props.currentUser();
    }
    render() {
      switch (this.props.authenticated) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          if (this.props.user.type === "admin") {
            return <WrappedComponent {...this.props} />;
          }
          return <Redirect to="/home" />;
      }
    }
  }
  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      user: state.auth.user
    };
  }

  return connect(mapStateToProps, { currentUser })(RequireAuth);
};
