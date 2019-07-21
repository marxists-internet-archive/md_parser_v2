import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import {
  prepareMdData,
  checkEmptyFields,
  showEmptyRequiredFieldsModal
} from "./sharedFunctions";
const cyrillicToTranslit = require("cyrillic-to-translit-js");

const DownloadMD = props => {
  const [visible, setVisible] = useState(false);
  const [requiredFields, setRequiredFields] = useState([]);

  const downloadMD = () => {
    const errors = checkEmptyFields(props.metadata);
    if (errors.length) {
      setVisible(true);
      setRequiredFields(errors);
      return;
    }

    let jsonData = {};
    // map all Metadata to key value pairs & create JSON object
    Object.entries(props.metadata).forEach(elem => {
      if (elem[1].fieldValue && elem[1].fieldValue !== "...") {
        jsonData[[elem[1].fieldLabel]] = elem[1].fieldValue;
      }
    });

    // concatenate json with content
    const mdFileAsString = prepareMdData(jsonData, props);

    // create file title
    const fileTitle = cyrillicToTranslit()
      .transform(props.metadata.title.fieldValue, "_")
      .toLowerCase()
      .replace("'", "");

    //create file
    const file = new File([mdFileAsString], fileTitle + ".md", {
      type: "text/plain;charset=utf-8"
    });
    saveAs(file);
  };

  const onClick = () => {
    setVisible(false);
  };

  const modal = showEmptyRequiredFieldsModal(requiredFields, onClick, visible);

  return (
    <span>
      <Dropdown.Item onClick={downloadMD}>Скачать MD</Dropdown.Item>
      {modal}
    </span>
  );
};

const mapStateToProps = state => {
  return {
    metadata: state.meta,
    editor: state.editor
  };
};

export default connect(mapStateToProps)(DownloadMD);
