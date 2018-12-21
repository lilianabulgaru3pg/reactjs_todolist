import React from 'react';

const ListItem = props => (
  <li className="checkbox">
    <label htmlFor="item-checkbox">
      <input
        id="item-checkbox"
        type="checkbox"
        checked={props.completed}
        onChange={props.handleChange}
      />
      {props.name}
    </label>
  </li>
);

export default ListItem;
