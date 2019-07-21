import React, { Component } from "react";
import ReactDomServer from "react-dom/server";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import handlebars from "handlebars/dist/handlebars";
import pretty from "pretty";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { fontPaths } from "./fontPaths";
import { renderPreview } from "../../preview/renderPreview";
import {
  prepareMdData,
  checkEmptyFields,
  showEmptyRequiredFieldsModal
} from "./sharedFunctions";

const cyrillicToTranslit = require("cyrillic-to-translit-js");
const beautifyJS = require("js-beautify");

class DownloadHTML extends Component {
  constructor(props) {
    super(props);
    this.renderedContent = "";
    this.renderPreview = renderPreview.bind(this);
    this.prepareMdData = prepareMdData.bind(this);
    this.state = {
      visible: false,
      requiredFields: []
    };
  }

  setRequiredFields = fields => {
    this.setState({
      requiredFields: fields
    });
  };

  setVisible = bool => {
    this.setState({
      visible: bool
    });
  };

  downloadHTML = async () => {
    let errors = checkEmptyFields(this.props.meta);
    if (errors.length) {
      this.setVisible(true);
      this.setRequiredFields(errors);
      return;
    }

    this.renderPreview();
    let jsonData = {};

    /* map all Metadata to key value pairs & create JSON object */
    Object.entries(this.props.meta).forEach(elem => {
      if (elem[1].fieldValue && elem[1].fieldValue !== "...") {
        jsonData[[elem[1].fieldLabel]] = elem[1].fieldValue;
      }
    });

    const mdFileAsString = this.prepareMdData(jsonData, this.props);

    /* Prepare data that will be injected into the handlebars template */
    let context = {};
    context["jsonData"] = jsonData;
    context["metaJson"] = beautifyJS(JSON.stringify(jsonData));
    context["renderedContent"] = ReactDomServer.renderToStaticMarkup(
      // renderedContent is declared in renderPreview();
      this.renderedContent
    );

    /* compile template */
    let compiledTemplate = await this.fetchTemplate().then(template => {
      return handlebars.compile(template);
    });

    /* insert content into the template */
    let result = pretty(compiledTemplate(context));

    /* create folder title */
    const folderTitle = cyrillicToTranslit()
      .transform(this.props.meta.title.fieldValue, "_")
      .toLowerCase()
      .replace("'", "");

    /* fetch all font assets */
    let promises = [];
    fontPaths.forEach(path =>
      promises.push(fetch(process.env.PUBLIC_URL + "/assets" + path))
    );

    let zip = new JSZip();
    let folder = zip.folder(folderTitle);

    await Promise.all(promises).then(results => {
      results.forEach(file => {
        // cleanup path for saving
        let url = file.url.match(/\/assets.*/)[0];
        folder.file("." + url, file.blob());
      });
    });

    /* fetch styles */
    await this.fetchFile(process.env.PUBLIC_URL + "/assets/style.css").then(
      file => folder.file("style.css", file)
    );

    fetch(process.env.PUBLIC_URL + "/assets/style.css");

    folder.file("index.html", result);
    folder.file(folderTitle + ".md", mdFileAsString);
    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, folderTitle + ".zip");
    });
  };

  fetchTemplate = async () => {
    let res = await fetch(process.env.PUBLIC_URL + "/assets/template.html");
    let template = await res.text();
    return template;
  };

  fetchFile = async url => {
    let res = await fetch(url);
    let file = await res.blob();
    return file;
  };

  render() {
    const modal = showEmptyRequiredFieldsModal(
      this.state.requiredFields,
      this.setVisible,
      this.state.visible
    );
    return (
      <span>
        <Dropdown.Item onClick={this.downloadHTML}>Скачать HTML</Dropdown.Item>
        {modal}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered,
    meta: state.meta,
    date: state.date,
    html: state.html,
    editor: state.editor
  };
};

export default connect(mapStateToProps)(DownloadHTML);
