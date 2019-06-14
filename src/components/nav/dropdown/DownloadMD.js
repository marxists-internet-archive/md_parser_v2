import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
const beautifyJS = require("js-beautify");
const cyrillicToTranslit = require("cyrillic-to-translit-js");

const DownloadMD = props => {
  const downloadMD = () => {
    let jsonData = {};
    // map all Metadata to key value pairs & create JSON object
    Object.entries(props.metadata).forEach(elem => {
      if (elem[1].fieldValue && elem[1].fieldValue !== "...") {
        jsonData[[elem[1].fieldLabel]] = elem[1].fieldValue;
      }
    });

    // concatenate json with content
    jsonData = beautifyJS(JSON.stringify(jsonData));
    jsonData = "§§JSONBLOCK_START§§\n" + jsonData + "\n§§JSONBLOCK_END§§\n\n";
    jsonData += props.editor.content;

    // create file title
    const fileTitle = cyrillicToTranslit()
      .transform(props.metadata.title.fieldValue, "_")
      .toLowerCase();

    //create file
    const file = new File([jsonData], fileTitle + ".md", {
      type: "text/plain;charset=utf-8"
    });
    saveAs(file);
  };

  return <Dropdown.Item onClick={downloadMD}>Скачать MD</Dropdown.Item>;
};

const mapStateToProps = state => {
  return {
    metadata: state.meta,
    editor: state.editor
  };
};

export default connect(mapStateToProps)(DownloadMD);
