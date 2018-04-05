import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { testAction } from "../actions/app";

class Home extends Component {
  componentDidMount() {
    this.props.testAction();
  }
  render() {
    return (
      <div>
        <h1>Mern Boilerplate Home</h1>
        {this.props.test}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    test: state.app.test
  };
}

export default connect(mapStateToProps, { testAction })(Home);
