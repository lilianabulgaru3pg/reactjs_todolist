import React, { Component } from "react";

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="items-section">
        <ul className="items-list" />
      </section>
    );
  }
}

export default ItemsList;
