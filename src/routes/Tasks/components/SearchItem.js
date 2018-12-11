import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
  }

  handleInputChange = ev => {
    this.setState({ searchText: ev.target.value });
  };

  handleClick = () => {
    this.props.history.push({ search: `?item=${this.state.searchText}` });
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="search-input"
          onChange={this.handleInputChange}
          value={this.state.searchText}
        />
        <button
          className="button-search  button-style-1"
          onClick={this.handleClick}
        >
          Search
        </button>
      </React.Fragment>
    );
  }
}
const SearchItemWithRouter = withRouter(SearchItem);
export default SearchItemWithRouter;
