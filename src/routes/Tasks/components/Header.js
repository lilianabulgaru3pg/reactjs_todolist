import React, { Component } from "react";
import SearchItem from "./SearchItem";

class Header extends Component {
  state = {};
  render() {
    return (
      <header>
        <h2>To-do List</h2>
        <SearchItem />
      </header>
    );
  }
}

export default Header;
