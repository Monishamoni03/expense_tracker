//common modal component - REUSABLE COMPONENT

import React from "react";
import { Modal } from "react-bootstrap";

const ModalType = (props) => {
  const { show, handleClose, size, modalTitle, config } = props;
  return (
    <Modal onClose={handleClose} size={size} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
        <p className="btn-modal-close" onClick={() => handleClose()}>
          <i className="fa fa-times text-danger"></i>
        </p>
      </Modal.Header>

      <Modal.Body>{props.config}</Modal.Body>
      <Modal.Footer>{props.children}</Modal.Footer>
    </Modal>
  );
};

export default ModalType;