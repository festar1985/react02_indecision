import React from "react";

const Action = (props) => {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.handlerPick}
        disabled={!props.hasOptions}
      >
        What should i do now?
      </button>
    </div>
  );
};

export default Action;
