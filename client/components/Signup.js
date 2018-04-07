import React, { Component } from "react";
import SignupForm from "./SignupForm";
import requireAdmin from "./hoc/requireAdmin";

class Signup extends Component {
  render() {
    return (
      <div className="container">
        <SignupForm />
      </div>
    );
  }
}

export default requireAdmin(Signup);
