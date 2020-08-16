import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  heading: string;
  body: string;
  confirmLabel: string;
  confirmVariant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "link";
}

const ConfirmModal: React.SFC<ConfirmModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  heading,
  body,
  confirmVariant,
  confirmLabel,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant={confirmVariant} onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
