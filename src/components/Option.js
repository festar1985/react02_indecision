import React from "react";

const Option = (props) => {
  return (
    <div className="option">
      <p className="option__text">
        {props.count}. {props.optionText}
      </p>

      <button
        className="small-button small-button--remove"
        onClick={(e) => {
          props.handleDeleteSingleOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default Option;
