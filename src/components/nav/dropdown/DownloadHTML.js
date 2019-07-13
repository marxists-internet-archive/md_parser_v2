import React from "react";
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

    // concatenate json with content
    jsonData = beautifyJS(JSON.stringify(jsonData));
    jsonData = "<!-- metaJSON\n" + jsonData + "\nmetaJSON -->\n\n";
    jsonData += '<!doctype html>\n<html>\n<head>\n';
    jsonData += '<title>' + props.metadata.author.fieldValue +' — '+ props.metadata.title.fieldValue +' </title>\n';
    jsonData += '<meta name="keywords" content="'+ props.metadata.keywords.fieldValue +'" />\n'
    jsonData += '<link rel="stylesheet" href="http://pm-pu.ru/marx/style_for_marxists.css">\n';
    jsonData += '</head>\n<body>\n';
    jsonData += '<div class="nav-links"><a href="https://marxists.org/">МИА</a>&#160;&#160;&gt;&#160;<a href="https://marxists.org/russkij/">Русский раздел</a>&#160;&#160;&gt;&#160;';
    jsonData += '<a href="https://marxists.org/russkij/archive/' + surnameAuthor +'">'+ surnameAuthor +'</a></div>\n\n';
    jsonData += '<div class="content">\n<h1 class="title">' + props.metadata.title.fieldValue + '</h1>\n';
    jsonData += '<div class="author">'+ props.metadata.author.fieldValue +'</div>\n<hr />\n\n';
    jsonData += '<div class="meta">';
    jsonData += '<span class="meta-description"> Первая публикация: </span> <span class="meta-value"> ' +  props.metadata.date.fieldValue + '</span><br/>';
    jsonData += '<span class="meta-description"> Источник: </span> <span class="meta-value"> ' +  props.metadata.origin.fieldValue + '</span>';
    jsonData +=  '</div><hr/>\n\n' + props.editor.contentRendered + '</div>\n';
    jsonData += '</body>\n</html>'

    // create file title
    const fileTitle = cyrillicToTranslit()
      .transform(props.metadata.title.fieldValue, "_")
      .toLowerCase();

    //create file
    const file = new File([jsonData], fileTitle + ".html", {
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
