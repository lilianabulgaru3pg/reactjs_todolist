import React, { Component } from "react";
import InputField from "../../../components/InputField";
import { Auth, Firestore } from "../../../services/firebaseConfig";

class AddTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { taskInput: "" };
  }

  handleClick = event => {
    let input = this.state.taskInput;
    console.log(input);
    this.postNewTaskData(input);
    event.preventDefault();
  };

  postNewTaskData(title) {
    let id = Auth.currentUser.uid;
    Firestore.collection("tasks")
      .add({
        name: title,
        userID: id,
        items: []
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

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
