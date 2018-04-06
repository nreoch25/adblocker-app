import React, { Component } from "react";
import UploadForm from "./UploadForm";
import requireAuth from "./hoc/requireAuth";

class Upload extends Component {
  render() {
    return (
      <div className="container">
        <UploadForm />
      </div>
    );
  }
}

export default requireAuth(Upload);
