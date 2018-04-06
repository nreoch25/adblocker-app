import React, { Component } from "react";

class UploadForm extends Component {
  handleFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("adName", this.adName.value);
    formData.append("adType", this.adType.value);
    formData.append("adImage", this.adImage.files[0]);
    fetch("/api/image", {
      method: "POST",
      body: formData
    }).then(response => {
      console.log("SUCCESSFUL", response);
      this.uploadForm.reset();
    }).catch(error => {
      console.log("ERROR", error);
      this.uploadForm.reset();
    });
  };
  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-4 mx-auto">
          <div className="card box-shadow-panel padding-10">
            <div className="card-header remove-border-bottom">
              <h3 className="card-title text-center margin-bottom-0">
                Upload Form
              </h3>
            </div>
            <div className="card-block margin-top-10">
              <form ref={ref => { this.uploadForm = ref; }} onSubmit={this.handleFormSubmit}>
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
                  <label>Ad Type:</label>
                  <select className="form-control" ref={ref => { this.adType = ref; }} name="adType" required>
                    <option value="leaderboard">Leaderboard (728x90)</option>
                    <option value="bigbox">Bigbox (300x250)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Upload Image Ad:</label>
                  <input
                    ref={ref => {
                      this.adImage = ref;
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
                  Upload
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
