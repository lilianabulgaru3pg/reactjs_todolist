import React, { Component } from "react";
import InputField from "../../../components/InputField";
import * as db from "../../../services/database";
import { Auth } from "../../../services/firebaseConfig";

class AddTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { taskInput: "" };
  }

  handleClick = event => {
    let input = this.state.taskInput;
    console.log(input);
    let id = Auth.currentUser.uid;
    let data = {
      userID: id,
      name: input,
      items: []
    };
    db.postNewTaskData(data);
    event.preventDefault();
  };

  handleMouseOver = event => {
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

export default AddTaskComponent;
