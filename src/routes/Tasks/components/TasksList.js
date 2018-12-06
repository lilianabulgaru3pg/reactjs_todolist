import React, { Component } from "react";
import { Firestore, tasksListsListener } from "../../../services/database";
import { TASKS_COLLECTION } from "../../../constants";
import { FirebaseContext } from "../../../services/firebaseConfig";
import uuid from "uuid";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidMount() {
    tasksListsListener(
      TASKS_COLLECTION,
      ["userID", "==", "1jY2WkbRKDQ2ENCamB4LEVBYbtw1"],
      docs => {
        var newTasks = [];
        docs.forEach(doc => {
          newTasks.push(doc.data());
        });
        console.log("Current data: ", newTasks);
        this.setState(tasks => ({ tasks: newTasks }));
      }
    );
  }
  render() {
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
