import React, { Component } from "react";
import UserContent from "./components/UserContent";
import TasksList from "./components/TasksList";
import AddTaskComponent from "./components/AddTaskComponent";

export default class Tasks extends Component {
  render() {
    return (
      <div className="flex-container page-2 ">
        <main className="flex-item-3 left-card-2 blue-bg">
          <UserContent />
          <TasksList />
          <AddTaskComponent />
        </main>
        <aside className="flex-item-4 right-card-2">
          {/* <header>
            <h2>To-do List</h2>
          </header> */}
        </aside>
      </div>
    );
  }
}
