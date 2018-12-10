import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addListener } from "../../../services/database";
import { ITEMS_COLLECTION } from "../../../constants";

class ItemsList extends Component {
  state = { items: [] };
  taskID = "";
  unsubscribe = null;

  subscribe(taskID) {
    return addListener(ITEMS_COLLECTION, ["taskID", "==", taskID], docs => {
      console.log(docs);
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
    this.taskID = this.props.history.location.pathname.split("/")[2];
    if (this.taskID) this.unsubscribe = this.subscribe(this.taskID);
  }

  componentDidUpdate() {
    let taskID = this.props.history.location.pathname.split("/")[2];
    console.log("taskID", this.taskID);
    console.log(taskID);
    if (this.taskID != taskID || !this.unsubscribe) {
      this.taskID = taskID;
      this.unsubscribe = this.subscribe(this.taskID);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  handleChange = () => {};

  createItemsList = () => {
    let itemsList = this.state.items;
    if (itemsList.length == 0) return false;
    var listItems = itemsList.map(({ id, name, completed }, index) => (
      <li key={id} className="checkbox">
        <input
          type="checkbox"
          id={index}
          checked={completed}
          onChange={this.handleChange}
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

const ItemsListWithRouter = withRouter(ItemsList);

export default ItemsListWithRouter;
