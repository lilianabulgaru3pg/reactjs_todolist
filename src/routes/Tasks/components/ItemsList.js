import React, { Component } from "react";
import { addListener, putData } from "../../../services/database";
import { ITEMS_COLLECTION } from "../../../constants";

const ListItem = props => {
  return (
    <li className="checkbox">
      <input
        type="checkbox"
        checked={props.completed}
        onChange={props.handleChange}
      />
      <label>{props.name}</label>
    </li>
  );
};

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], searchText: "" };
  }

  unsubscribe = null;

  subscribe(taskID) {
    return addListener(ITEMS_COLLECTION, ["taskID", "==", taskID], docs => {
      if (docs.empty) {
        this.setState(() => ({ items: "" }));
        return;
      }
      var newItems = [];
      docs.forEach(doc => {
        newItems.push({ ...doc.data(), id: doc.id });
      });
      this.setState(() => ({ items: newItems }));
    });
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

    var searchText = search.replace("?", "").split("=")[1];
    if (prevSearch != search) this.setState({ searchText: searchText });

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

    if ((taskId != prevId || !this.unsubscribe) && taskId) {
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
    let itemsList = this.state.items;
    if (itemsList.length == 0) return false;

    let { searchText } = this.state;
    var filtredList = itemsList;
    if (searchText)
      filtredList = itemsList.filter(({ name }) => name.includes(searchText));

    let listItems = filtredList.map(({ id, name, completed }) => {
      return (
        <ListItem
          key={id}
          checked={completed}
          handleChange={this.handleChange(id)}
          name={name}
        />
      );
    });

    return listItems;
  };

  render() {
    var listItems = this.createItemsList();
    return (
      <section className="items-section">
        {listItems ? (
          <ul className="items-list">{listItems}</ul>
        ) : (
          <label>
            Your list is empty, add items to the list by pressing the + button.
          </label>
        )}
      </section>
    );
  }
}

export default ItemsList;
