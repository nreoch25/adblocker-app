import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";

const required = value => (value ? undefined : "Required");

class LoginForm extends Component {
  static propTypes = {
    ...propTypes,
    loginUser: PropTypes.func,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  };
  handleFormSubmit = values => {
    // call action creator for login user
    this.props.loginUser(values, this.props.history);
  };
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div className="form-group">
        <input className="form-control" {...input} type={type} />
      </div>
      {touched &&
        (error && (
          <div className="alert alert-danger p-1">
            <small>{error}</small>
          </div>
        ))}
    </div>
  );
  renderAlert() {
    if (this.props.errorMessage) {
      if (Array.isArray(this.props.errorMessage)) {
        return this.props.errorMessage.map((error, i) => {
          return (
            <div key={i} className="alert alert-danger">
              {error}
            </div>
          );
        });
      }
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      );
    }
  }
  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-4 mx-auto">
          <div className="card box-shadow-panel padding-10">
            <div className="card-header remove-border-bottom">
              <h3 className="card-title text-center margin-bottom-0">
                Please Sign in
              </h3>
            </div>
            <div className="card-block margin-top-10">
              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field
                  name="email"
                  component={this.renderField}
                  label="Email:"
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <Field
                  name="password"
                  component={this.renderField}
                  label="Password:"
                  type="password"
                  className="form-control"
                  validate={[required]}
                />
                {this.renderAlert()}
                <button
                  type="submit"
                  className="btn btn-lg btn-success btn-block"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
