import React from "react";

export default function InputField(props) {
  const { name } = props;

  return (
    <label>
      {name}:
      <input {...props} />
    </label>
  );
}
