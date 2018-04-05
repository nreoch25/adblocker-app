import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInventory } from "../actions/app";

class Inventory extends Component {
  componentDidMount() {
    this.props.fetchInventory();
  }
  displayInventory() {
    // TODO Display each ad in a card with all the information
    const inventory = this.props.inventory;
    if(inventory.length > 0) {
      return inventory.map((item) => {
        const base64Image = new Buffer(item.img).toString("base64");
        const base64ImageURL = `data:${item.contentType};base64,${base64Image}`;
        return (
          <div key={item._id} className="row">
            <img src={base64ImageURL} />
          </div>
        )
      })
    }
  }
  render() {
    console.log(this.props.inventory);
    return (
      <div className="container">
        {this.displayInventory()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventory: state.app.inventory
  };
}

export default connect(mapStateToProps, { fetchInventory })(Inventory);
