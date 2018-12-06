import React, { Component } from "react";
import { tasksListsListener } from "../../../services/database";
import { TASKS_COLLECTION } from "../../../constants";
import { FirebaseContext } from "../../../services/firebaseConfig";
import uuid from "uuid";
import { Link, Route } from "react-router-dom";
import ItemsList from "./ItemsList";

class TasksList extends Component {
  state = { tasks: [] };

  componentDidMount() {
    const { uid } = this.context;

    if (uid) {
      this.unsubscribe = this.subscribe(uid);
    }
  }

  componentDidUpdate() {
    const { uid } = this.context;

    if (!this.unsubscribe && uid) {
      this.unsubscribe = this.subscribe(uid);
    }
  }

  subscribe(newUid) {
    return tasksListsListener(
      TASKS_COLLECTION,
      ["userID", "==", newUid],
      docs => {
        var newTasks = [];

        docs.forEach(doc => {
          newTasks.push({ ...doc.data(), id: doc.id });
        });

        this.setState(() => ({ tasks: newTasks }));
      }
    );
  }

  unsubscribe = null;

  shouldComponentUpdate() {
    var { uid } = this.context;

    if (!uid) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.unsubscribe ? this.unsubscribe() : false;
  }

  render() {
    console.log("render");
    let tasksList = this.state.tasks;
    const listItems = tasksList.map(({ id, name }) => (
      <li key={id}>
        <Link to={"/tasks/" + id}>{name}</Link>
      </li>
    ));

    return (
      <nav>
        <ul className="user-tasks">{listItems}</ul>
      </nav>
    );
  }
}

TasksList.contextType = FirebaseContext;
export default TasksList;
