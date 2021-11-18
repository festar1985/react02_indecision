import React from "react";
import Modal from "react-modal";

const OptionModal = (props) => {
  return (
    <Modal
      isOpen={!!props.selectedOption}
      contentLabel="The AI has selected for you:"
      onRequestClose={props.handleModalOK}
      closeTimeoutMS={500}
      className="modal"
    >
      <h3 className="modal__title">Your Selected Option:</h3>
      {props.selectedOption && (
        <p className="modal__text">{props.selectedOption}</p>
      )}
      <button className="modal__button" onClick={props.handleModalOK}>
        OK
      </button>
    </Modal>
  );
};

export default OptionModal;
