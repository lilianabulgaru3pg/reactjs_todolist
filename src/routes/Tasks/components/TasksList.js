import React, { Component } from "react";
import { Firestore, tasksListsListener } from "../../../services/database";
import { TASKS_COLLECTION } from "../../../constants";
import { FirebaseContext } from "../../../services/firebaseConfig";
import uuid from "uuid";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], uid: "" };
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.subscribe(this.context.uid);
  }

  subscribe(newUid) {
    console.log("subscribe", newUid);
    return tasksListsListener(
      TASKS_COLLECTION,
      ["userID", "==", newUid],
      docs => {
        var newTasks = [];
        docs.forEach(doc => {
          newTasks.push(doc.data());
        });
        console.log("Current data: ", newTasks);
        this.setState((tasks, uid) => ({ tasks: newTasks, uid: newUid }));
      }
    );
  }

  shouldComponentUpdate() {
    var newUid = this.context.uid;
    console.log("shouldComponentUpdate", newUid, this.state.uid);
    if (newUid === this.state.uid) {
      console.log("Did Update", newUid);
      return true;
    }
    if (newUid !== this.state.uid && newUid) {
      this.unsubscribe ? this.unsubscribe() : false;
      this.unsubscribe = this.subscribe(newUid);
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
    const listItems = tasksList.map(item => (
      <li key={uuid()}>
        <a href="">{item.name}</a>
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
