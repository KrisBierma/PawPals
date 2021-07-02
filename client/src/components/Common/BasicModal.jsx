import React from "react";
import { Button, Modal } from "react-bootstrap";

// the Modal generates a warning aboud the use of findDOMNode. This is a bootstrap issue. See ticket here: https://github.com/react-bootstrap/react-bootstrap/issues/5075

export default function BasicModal({
  show = false, // bool value to handle whether modal is open or closed
  handleClose = () => {}, //function that will trigger when modal is closed. 
  title = '',
  body = '',
  closeTitle = '',
  saveTitle = '',
  }) {
    return (
      <Modal show={show} onHide={handleClose}>
        {/* Conditionally renders the title on Modal if title is passed */}
        {title && <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>}
        {/* Conditionally renders the body within Modal if body is passed */}
        {body && <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> }
        <Modal.Footer>
          {closeTitle && <Button variant="secondary" onClick={handleClose}>
            {closeTitle}
          </Button>}
          {saveTitle && <Button variant="primary" onClick={handleClose}>
            {saveTitle}
          </Button>}
        </Modal.Footer>
      </Modal>
    );
  }