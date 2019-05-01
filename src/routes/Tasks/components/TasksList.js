import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addListener } from '../../../services/database';
import { TASKS_COLLECTION, TASKS } from '../../../constants';
import { FirebaseContext } from '../../../services/firebase';

export class TasksList extends Component {
  state = { tasks: [], firstTaskID: '' };

  unsubscribe = null;

  componentDidMount() {
    const { uid } = this.context;
    if (uid) this.unsubscribe = this.subscribe(uid);
  }

  shouldComponentUpdate() {
    const { uid } = this.context;

    if (!uid) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    const { uid } = this.context;
    if (!this.unsubscribe && uid) this.unsubscribe = this.subscribe(uid);

    const taskID = this.props.history.location.pathname.split('/')[2];
    if (!taskID && this.state.firstTaskID) {
      this.props.history.push({
        pathname: `${TASKS}/${this.state.firstTaskID}`,
        state: {}
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  subscribe(newUid) {
    return addListener(TASKS_COLLECTION, ['userID', '==', newUid], docs => {
      if (docs.empty) return;
      const newTasks = [];
      docs.forEach(doc => {
        newTasks.push({ ...doc.data(), id: doc.id });
      });
      this.setState(() => ({ tasks: newTasks, firstTaskID: newTasks[0].id }));
    });
  }

  render() {
    const tasksList = this.state.tasks;
    const listItems = tasksList.map(({ id, name }) => (
      <li key={id}>
        <Link from="task" to={`/tasks/${id}`}>
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
