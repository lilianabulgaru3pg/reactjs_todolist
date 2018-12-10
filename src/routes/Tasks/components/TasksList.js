import React, { Component } from "react";
import { addListener } from "../../../services/database";
import { TASKS_COLLECTION, TASKS } from "../../../constants";
import { FirebaseContext } from "../../../services/firebaseConfig";
import { Link, withRouter } from "react-router-dom";

class TasksList extends Component {
  state = { tasks: [], firstTaskID: "" };

  componentDidMount() {
    const { uid } = this.context;
    if (uid) this.unsubscribe = this.subscribe(uid);
  }

  componentDidUpdate() {
    const { uid } = this.context;
    if (!this.unsubscribe && uid) this.unsubscribe = this.subscribe(uid);

    let taskID = this.props.history.location.pathname.split("/")[2];
    if (!taskID && this.state.firstTaskID) {
      this.props.history.push({
        pathname: `${TASKS}/${this.state.firstTaskID}`,
        state: {}
      });
    }
  }

  subscribe(newUid) {
    return addListener(TASKS_COLLECTION, ["userID", "==", newUid], docs => {
      if (docs.empty) return;
      var newTasks = [];
      docs.forEach(doc => {
        newTasks.push({ ...doc.data(), id: doc.id });
      });
      this.setState(() => ({ tasks: newTasks, firstTaskID: newTasks[0].id }));
    });
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
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    let tasksList = this.state.tasks;
    const listItems = tasksList.map(({ id, name }) => (
      <li key={id}>
        <Link from="task" to={"/tasks/" + id}>
          {name}
        </Link>
      </li>
    ));

    return (
      <nav>
        <ul className="user-tasks">{listItems}</ul>
      </nav>
    );
  }
}
const TasksListWithRouter = withRouter(TasksList);

export default TasksListWithRouter;
TasksList.contextType = FirebaseContext;
