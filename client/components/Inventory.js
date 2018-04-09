import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "./hoc/requireAuth";
import { bytesToKB } from "../utils/AppUtils";
import { fetchInventory } from "../actions/app";

class Inventory extends Component {
  componentDidMount() {
    this.props.fetchInventory();
  }
  displayInventory() {
    const inventory = this.props.inventory;
    if(inventory.length > 0) {
      return inventory.map((item) => {
        const base64Image = new Buffer(item.img).toString("base64");
        const base64ImageURL = `data:${item.contentType};base64,${base64Image}`;
        const imageKB = bytesToKB(item.size);
        return (
          <div key={item._id} className="row margin-top-10">
            <div className="card padding-10 padding-top-5">
              <div className="card-header padding-left-0 font-size-125">
                <span className="font-weight-bold">Creative Name:</span> {item.name}
              </div>
              <a href={item.clickThrough} target="_blank"><img src={base64ImageURL} /></a>
              <ul className="list-group list-group-flush font-size-90">
                <li className="list-group-item padding-left-0"><span className="font-weight-bold">Ad Type:</span> {item.adType}</li>
                <li className="list-group-item padding-left-0"><span className="font-weight-bold">Ad Size:</span> {imageKB}</li>
                <li className="list-group-item padding-left-0"><span className="font-weight-bold">Image Type:</span> {item.contentType}</li>
              </ul>
            </div>
          </div>
        )
      })
    }
  }
  render() {
    console.log(this.props.inventory);
    return (
      <div className="container">
        <div className="col-md-12 margin-top-10">
          {this.displayInventory()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventory: state.app.inventory
  };
}

export default requireAuth(connect(mapStateToProps, { fetchInventory })(Inventory));
