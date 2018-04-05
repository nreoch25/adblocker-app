import React, { Component } from "react";

class LoginForm extends Component {

  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-4 mx-auto">
          <div className="card box-shadow-panel form-padding">
            <div className="card-header remove-border-bottom">
              <h3 className="card-title text-center margin-bottom-0">
                Login Form
              </h3>
            </div>
            <div className="card-block margin-top-10">
              <form>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="input"
                    required
                  />
                </div>
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

export default LoginForm;
