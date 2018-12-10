import React, { Component } from "react";
import classNames from "classnames";
import { postData } from "../../../services/database";
import { ITEMS_COLLECTION } from "../../../constants";
import { withRouter } from "react-router-dom";

class AddItem extends Component {
  state = { showDialog: false, inputValue: "" };

  handleInputChange = ev => {
    this.setState({ inputValue: ev.target.value });
  };

  handleOnKeyPress = ev => {
    this.setState({ showDialog: true });
    if (ev.key === "Enter") {
      this.setState({ showDialog: false });
      let taskID = this.props.history.location.pathname.split("/")[2];
      let itemName = this.state.inputValue;
      postData(ITEMS_COLLECTION, {
        name: itemName,
        completed: false,
        taskID: taskID
      });
    }
  };

  showInputView = event => {
    event.preventDefault();
    this.setState({ showDialog: true });
  };

  render() {
    var { showDialog } = this.state;
    var inputClass = classNames({
      "add-item-input": true,
      "hide-add-item-input": !showDialog,
      "show-add-item-input": showDialog
    });

    var dialogCls = classNames({
      "add-item-dialog": true,
      "hide-dialog": !showDialog,
      "show-dialog": showDialog
    });

    return (
      <button className="button-add" onClick={this.showInputView}>
        +
        {showDialog && (
          <div className={dialogCls}>
            <input
              className={inputClass}
              onChange={this.handleInputChange}
              value={this.state.inputValue}
              onKeyPress={this.handleOnKeyPress}
            />
          </div>
        )}
      </button>
    );
  }
}

const AddItemWithRouter = withRouter(AddItem);
export default AddItemWithRouter;
