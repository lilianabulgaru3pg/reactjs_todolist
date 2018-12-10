import React, { Component } from "react";
import { addListener, putData } from "../../../services/database";
import { ITEMS_COLLECTION } from "../../../constants";

class ItemsList extends Component {
  state = { items: [] };
  taskID = "";
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
    const { id, state } = this.state.items.find(({ id }) => id === itemId);
    putData(ITEMS_COLLECTION, id, { completed: !state });
  };

  createItemsList = () => {
    let itemsList = this.state.items;
    if (itemsList.length == 0) return false;
    var listItems = itemsList.map(({ id, name, completed }) => (
      <li key={id} className="checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={this.handleChange(id)}
        />
        <label>{name}</label>
      </li>
    ));
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
