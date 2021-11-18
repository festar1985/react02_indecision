import React from "react";
import Option from "./Option";

const Options = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button
          className="small-button small-button--remove"
          onClick={props.handleDeleteOptions}
        >
          Remove All
        </button>
      </div>
      {props.options.length === 0 && (
        <p className="widget-message">
          There are no options added.Please add at least one.
        </p>
      )}
      {props.options.map((option, index) => (
        <Option
          key={option}
          optionText={option}
          count={index + 1}
          handleDeleteSingleOption={props.handleDeleteSingleOption}
        />
      ))}
    </div>
  );
};

export default Options;
