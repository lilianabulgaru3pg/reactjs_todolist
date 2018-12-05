import React, { Component } from "react";
import UserContent from "./components/UserContent";
import TasksList from "./components/TasksList";
import AddNewTask from "./components/AddNewTask";
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";

export default class Tasks extends Component {
  render() {
    return (
      <div className="flex-container page-2 ">
        <main className="flex-item-3 left-card-2 blue-bg">
          <UserContent />
          <TasksList />
          <AddNewTask />
        </main>
        <aside className="flex-item-4 right-card-2">
          <Header />
          <ItemsList />
        </aside>
      </div>
    );
  }
}
