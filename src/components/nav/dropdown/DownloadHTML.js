import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
const beautifyJS = require("js-beautify");
const cyrillicToTranslit = require("cyrillic-to-translit-js");

const DownloadHTML = props => {
  const downloadHTML = () => {
    let jsonData = {};
    // map all Metadata to key value pairs & create JSON object
    Object.entries(props.metadata).forEach(elem => {
      if (elem[1].fieldValue && elem[1].fieldValue !== "...") {
        jsonData[[elem[1].fieldLabel]] = elem[1].fieldValue;
      }
    });

    const nameAuthor = props.metadata.author.fieldValue;
    let surnameAuthor = nameAuthor.substring(0, nameAuthor.indexOf(" "));
    let translitSurname = cyrillicToTranslit()
      .transform(surnameAuthor, "_")
      .toLowerCase();

    jsonData = beautifyJS(JSON.stringify(jsonData));

    // concatenate json with content
    let html = `<!doctype html>
<html>
<head>
    <title> ${props.metadata.author.fieldValue} ${props.metadata.title.fieldValue}</title>
    <meta name="keywords" content="${props.metadata.keywords.fieldValue}" />
    <link rel="stylesheet" href="../../../../style.css">
    <meta charset="utf-8">
    <!-- metaJSON
    ${jsonData}
    metaJSON -->
</head>
<body>
    <div class="nav-links">
        <a href="../../../../../../index.htm">МИА</a>&#160;&#160;&gt;&#160;
        <a href="../../../../../index.htm">Русский раздел</a>&#160;&#160;&gt;&#160;
        <a href="../../../index.html"> ${surnameAuthor} </a>
    </div>
    <div class="content">
        <h1 class="title"> ${props.metadata.title.fieldValue} </h1>
        <div class="author"> ${props.metadata.author.fieldValue}</div>
        <hr />
        <div class="meta">
            <span class="meta-description"> Первая публикация: </span>
            <span class="meta-value"> ${props.metadata.date.fieldValue}</span><br/>
            <span class="meta-description"> Источник: </span> <span class="meta-value"> ${props.metadata.origin.fieldValue} </span>
        </div>
        <hr/>
        ${props.editor.contentRendered}
    </div>
</body>
</html>`;

    // create file title
    const fileTitle = cyrillicToTranslit()
      .transform(props.metadata.title.fieldValue, "_")
      .toLowerCase();

    //create file
    const file = new File([html], fileTitle + ".html", {
      type: "text/html; charset=utf-8"
    });
    saveAs(file);
  };

  return <Dropdown.Item onClick={downloadHTML}>Скачать HTML</Dropdown.Item>;
};

const mapStateToProps = state => {
  return {
    metadata: state.meta,
    editor: state.editor
  };
};

export default connect(mapStateToProps)(DownloadHTML);
