import React, { Component } from "react";
import UserContent from "./components/UserContent";
import TasksList from "./components/TasksList";
import AddNewTask from "./components/AddNewTask";
import Header from "./components/Header";
import ItemsList from "./components/ItemsList";
import AddItem from "./components/AddItem";
import { Route } from "react-router-dom";

export default class Tasks extends Component {
  render() {
    return (
      <div className="flex-container page-2 ">
        <aside className="flex-item-3 left-card-2 blue-bg">
          <UserContent />
          <TasksList />
          <AddNewTask />
        </aside>
        <main className="flex-item-4 right-card-2">
          <Header />
          <Route path="/tasks/:taskId" component={ItemsList} />
          <AddItem />
        </main>
      </div>
    );
  }
}
