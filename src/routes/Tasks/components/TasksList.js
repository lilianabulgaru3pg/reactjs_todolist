import React, { Component } from "react";
class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    const items = [1, 2, 3, 4, 5];
    const listItems = items.map((item, idx) => (
      <li key={idx}>
        <a href="">{item}</a>
      </li>
    ));

    return (
      <nav>
        <ul className="user-tasks">{listItems}</ul>
      </nav>
    );
  }
}

export default TasksList;
