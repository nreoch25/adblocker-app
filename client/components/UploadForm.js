import React, { Component } from "react";

class UploadForm extends Component {

  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-4 mx-auto">
          <div className="card box-shadow-panel form-padding">
            <div className="card-header remove-border-bottom">
              <h3 className="card-title text-center margin-bottom-0">
                Upload Form
              </h3>
            </div>
            <div className="card-block margin-top-10">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    ref={ref => {
                      this.adName = ref;
                    }}
                    className="form-control"
                    type="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image Ad:</label>
                  <input
                    ref={ref => {
                      this.fileUpload = ref;
                    }}
                    className="form-control"
                    type="file"
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

export default UploadForm;
