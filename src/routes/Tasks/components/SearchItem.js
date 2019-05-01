import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
  }

  handleInputChange = ev => {
    this.setState({ searchText: ev.target.value });
    this.props.history.push({ search: `?item=${ev.target.value}` });
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="search-input"
          onChange={this.handleInputChange}
          value={this.state.searchText}
          placeholder="Search"
        />
      </React.Fragment>
    );
  }
}
const SearchItemWithRouter = withRouter(SearchItem);
export default SearchItemWithRouter;
