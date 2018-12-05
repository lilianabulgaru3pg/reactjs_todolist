import React, { Component } from "react";

class SearchItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {" "}
        <input className="search-input" />
        <button className="button-search  button-style-1">Search</button>
      </React.Fragment>
    );
  }
}

export default SearchItem;
