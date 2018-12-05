import React, { Component } from "react";
import InputField from "../../../components/InputField";
import * as db from "../../../services/database";
import { Auth } from "../../../services/firebaseConfig";
import { TASKS_COLLECTION } from "../../../constants";

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
    let response = db.postNewTaskData(TASKS_COLLECTION, data);
    response
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({ taskInput: "" });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
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
