import React, { Component } from 'react';
import * as db from '../../../services/database';
import { Auth } from '../../../services/firebaseConfig';
import { TASKS_COLLECTION } from '../../../constants';

class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.state = { taskInput: '' };
  }

  handleClick = event => {
    const inputText = this.state.taskInput;
    const id = Auth.currentUser.uid;
    const data = {
      userID: id,
      name: inputText,
      items: []
    };
    const response = db.postData(TASKS_COLLECTION, data);
    response.then(() => this.setState({ taskInput: '' }));
    event.preventDefault();
  };

  handleMouseOver = event => {
    // todo change css
    event.preventDefault();
  };

  handleInputChange = ev => {
    this.setState({ taskInput: ev.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="add-task-input show-input"
          onChange={this.handleInputChange}
          value={this.state.taskInput}
        />
        <button
          type="button"
          className="button-task button-style-1"
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onFocus={this.handleMouseOver}
        >
          Add Task
        </button>
      </React.Fragment>
    );
  }
}

export default AddNewTask;
