import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ItemsWithControl } from "../Common"
import "../../styles/BasicModal.css"

// the Modal generates a warning aboud the use of findDOMNode. This is a bootstrap issue. See ticket here: https://github.com/react-bootstrap/react-bootstrap/issues/5075

export default function BasicModal({
  show = false, // bool value to handle whether modal is open or closed
  handleClose = () => {}, //function that will trigger when modal is closed. 
  title = '',
  body = '',
  closeTitle = '',
  saveTitle = '',
  fields = [],
  tabs = <></>,
  }) {
    return (
      <Modal 
        show={show} 
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {tabs && tabs}
        {/* Conditionally renders the title on Modal if title is passed */}
        {title && <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>}
        {/* Conditionally renders the body within Modal if body is passed */}
        {body && <Modal.Body>{body}</Modal.Body> }
        {/* Render the various inputs/dropdowns needed */}
        <div className='modalFields'>
          {fields && fields.map((x) => {
            return (
              <ItemsWithControl 
                name={x.name}
                type={x.type}
              />
            );
          })}
        </div>
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