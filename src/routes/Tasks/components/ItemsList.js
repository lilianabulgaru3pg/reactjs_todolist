import React, { Component } from 'react';
import { addListener, putData } from '../../../services/database';
import { ITEMS_COLLECTION } from '../../../constants';

const ListItem = props => (
  <li className="checkbox">
    <label htmlFor="item-checkbox">
      <input
        id="item-checkbox"
        type="checkbox"
        checked={props.completed}
        onChange={props.handleChange}
      />
      {props.name}
    </label>
  </li>
);

class ItemsList extends Component {
  unsubscribe = null;

  constructor(props) {
    super(props);
    this.state = { items: [], searchText: '' };
  }

  componentDidMount() {
    const {
      match: {
        params: { taskId }
      }
    } = this.props;
    if (taskId) this.unsubscribe = this.subscribe(taskId);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch }
    } = prevProps;
    const {
      location: { search }
    } = this.props;

    this.updateSearchState(search, prevSearch);

    const {
      match: {
        params: { taskId: prevId }
      }
    } = prevProps;
    const {
      match: {
        params: { taskId }
      }
    } = this.props;

    if ((taskId !== prevId || !this.unsubscribe) && taskId) {
      this.unsubscribe = this.subscribe(taskId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  handleChange = itemId => () => {
    const { id, completed } = this.state.items.find(({ id }) => id === itemId);
    putData(ITEMS_COLLECTION, id, { completed: !completed });
  };

  createItemsList = () => {
    const itemsList = this.state.items;
    if (itemsList.length === 0) return false;

    const { searchText } = this.state;
    let filtredList = itemsList;
    if (searchText)
      filtredList = itemsList.filter(({ name }) => name.includes(searchText));

    const listItems = filtredList.map(({ id, name, completed }) => (
      <ListItem
        key={id}
        checked={completed}
        handleChange={this.handleChange(id)}
        name={name}
      />
    ));

    return listItems;
  };

  updateSearchState(search, prevSearch) {
    const searchText = search.replace('?', '').split('=')[1];
    if (prevSearch !== search) this.setState({ searchText });
  }

  subscribe(taskID) {
    return addListener(ITEMS_COLLECTION, ['taskID', '==', taskID], docs => {
      if (docs.empty) {
        this.setState(() => ({ items: '' }));
        return;
      }
      const newItems = [];
      docs.forEach(doc => {
        newItems.push({ ...doc.data(), id: doc.id });
      });
      this.setState(() => ({ items: newItems }));
    });
  }

  render() {
    const listItems = this.createItemsList();
    return (
      <section className="items-section">
        {listItems ? (
          <ul className="items-list">{listItems}</ul>
        ) : (
          <h4>
            Your list is empty, add items to the list by pressing the + button.
          </h4>
        )}
      </section>
    );
  }
}

export default ItemsList;
