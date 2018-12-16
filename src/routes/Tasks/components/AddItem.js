import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { postData } from '../../../services/database';
import { ITEMS_COLLECTION } from '../../../constants';

class AddItem extends Component {
  state = { showDialog: false, inputValue: '' };

  handleInputChange = ev => {
    this.setState({ inputValue: ev.target.value });
  };

  handleOnKeyPress = ev => {
    this.setState({ showDialog: true });
    if (ev.key === 'Enter') {
      this.setState({ showDialog: false });
      const taskID = this.props.history.location.pathname.split('/')[2];
      const itemName = this.state.inputValue;
      postData(ITEMS_COLLECTION, {
        name: itemName,
        completed: false,
        taskID
      });
    }
  };

  showInputView = event => {
    event.preventDefault();
    this.setState({ showDialog: true });
  };

  render() {
    const { showDialog } = this.state;
    const inputClass = classNames({
      'add-item-input': true,
      'hide-add-item-input': !showDialog,
      'show-add-item-input': showDialog
    });

    const dialogCls = classNames({
      'add-item-dialog': true,
      'hide-dialog': !showDialog,
      'show-dialog': showDialog
    });

    return (
      <button type="button" className="button-add" onClick={this.showInputView}>
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
