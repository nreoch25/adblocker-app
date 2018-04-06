import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { currentUser } from "../../actions/authentication";

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      console.log("REQUIRE AUTH HOC - COMPONENT WILL MOUNT");
      this.props.currentUser();
    }
    render() {
      switch (this.props.authenticated) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          return <WrappedComponent {...this.props} />;
      }
    }
  }
  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps, { currentUser })(RequireAuth);
};
