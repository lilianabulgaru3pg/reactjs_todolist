import React, { Component } from "react";
import InputField from "../../../components/InputField";
import * as db from "../../../services/database";
import { Auth } from "../../../services/firebaseConfig";
import { TASKS_COLLECTION } from "../../../constants";

class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.state = { taskInput: "" };
  }

  handleClick = event => {
    var inputText = this.state.taskInput;
    let id = Auth.currentUser.uid;
    let data = {
      userID: id,
      name: inputText,
      items: []
    };
    let response = db.postNewTaskData(TASKS_COLLECTION, data);
    response
      .then(() => this.setState({ taskInput: "" }))
      .catch(error => console.error("Error adding document: ", error));
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
        <InputField
          className="add-task-input show-input"
          onChange={this.handleInputChange}
          value={this.state.taskInput}
        />
        <button
          className="button-task button-style-1"
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
        >
          Add Task
        </button>
      </React.Fragment>
    );
  }
}

export default AddNewTask;
