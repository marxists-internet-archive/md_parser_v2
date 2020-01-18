import React from "react";
import { Button, Modal, Alert } from "react-bootstrap";
const beautifyJS = require("js-beautify");

export function prepareMdData(jsonData, props) {
  // concatenate json with content
  jsonData = beautifyJS(JSON.stringify(jsonData));
  jsonData = "§§JSONBLOCK_START§§\n" + jsonData + "\n§§JSONBLOCK_END§§\n\n";
  return (jsonData += props.editor.content);
}

export function checkEmptyFields(metadata) {
  let errors = [];
  Object.entries(metadata).forEach(elem => {
    if (
      elem[1].isRequired &&
      (elem[1].fieldValue === "" || elem[1].fieldValue === "...")
    ) {
      errors.push(elem[1].fieldName);
    }
  });
  return errors;
}

export function showEmptyRequiredFieldsModal(requiredFields, onClick, visible) {
  return (
    <Modal show={visible} onHide={() => onClick(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Не все обязательные поля заполненны!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={"danger"}>
          Поля которые требуется заполнить:
          <ul>
            {requiredFields.map((field, idx) => (
              <li key={idx}>{field}</li>
            ))}
          </ul>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClick(false)}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
