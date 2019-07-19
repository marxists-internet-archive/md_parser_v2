import React, { Component } from "react";
import ReactDomServer from "react-dom/server";
import { Dropdown, Container } from "react-bootstrap";
import { connect } from "react-redux";
import handlebars from "handlebars/dist/handlebars";
import template from "./assets/template";
import pretty from "pretty";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import pageStyles from "./assets/style";

const cyrillicToTranslit = require("cyrillic-to-translit-js");
const beautifyJS = require("js-beautify");

const style = {
  translation: {
    display: "inline"
  }
};

class DownloadHTML extends Component {
  constructor(props) {
    super(props);
    this.renderedContent = "";
    this.template = template;
  }

  renderPreview = () => {
    /**
     * set content to render
     */
    const {
      author,
      title,
      origin,
      source,
      date,
      keywords,
      type,
      translation,
      translationLink
    } = this.props.meta;
    const { alertResult } = this.props.date;

    let translated = translation.fieldValue ? (
      <h4 style={style.translation}>{translation.fieldValue}</h4>
    ) : null;

    translated =
      translation.fieldValue && translationLink.fieldValue ? (
        <h4 style={style.translation}>
          <a href={translationLink.fieldValue}>{translation.fieldValue}</a>
        </h4>
      ) : (
        translated
      );

    this.renderedContent = (
      <Container className="preview" id="preview">
        <div className="nav-links">
          <a href="../../../../../../index.htm">МИА</a>&#160;&#160;&gt;&#160;
          <a href="../../../../../index.htm">Русский раздел</a>
          &#160;&#160;&gt;&#160;
          <a href="../../../index.html"> Макаренко </a>
        </div>
        <div className="meta">
          {author && <h2>{author.fieldValue}</h2>}
          {title && <h3>{title.fieldValue}</h3>}

          <div className="meta-box">
            {date && (
              <h4>Дата первого опубликования : {alertResult && alertResult}</h4>
            )}
            {origin && (
              <h4>
                <a href={source.fieldValue}>
                  {origin.fieldName} {origin.fieldValue}
                </a>
              </h4>
            )}
            {keywords.fieldValue && (
              <h4>
                <i>
                  {keywords.fieldValue.split(", ").map(elem => `#${elem} `)}
                </i>
              </h4>
            )}
            {type && type.fieldValue !== "..." && (
              <h4>
                {type.fieldName}: {type.fieldValue}
              </h4>
            )}
            {translated && (
              <span>
                <h4 style={style.translation}>Перевод: </h4>
                {translated}
              </span>
            )}
          </div>
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }} />
      </Container>
    );
  };

  downloadHTML = () => {
    this.renderPreview();

    let jsonData = {};

    // map all Metadata to key value pairs & create JSON object
    Object.entries(this.props.meta).forEach(elem => {
      if (elem[1].fieldValue && elem[1].fieldValue !== "...") {
        jsonData[[elem[1].fieldLabel]] = elem[1].fieldValue;
      }
    });

    let context = {};
    context["jsonData"] = jsonData;
    context["metaJson"] = beautifyJS(JSON.stringify(jsonData));
    context["renderedContent"] = ReactDomServer.renderToStaticMarkup(
      this.renderedContent
    );

    /* compile template */
    let compiledTemplate = handlebars.compile(template);
    /* insert content into the template */
    let result = pretty(compiledTemplate(context));

    // create file title
    const fileTitle = cyrillicToTranslit()
      .transform(this.props.meta.title.fieldValue, "_")
      .toLowerCase();
    // create folder title
    const folderTitle = cyrillicToTranslit()
      .transform(this.props.meta.author.fieldValue, "_")
      .toLowerCase();

    let zip = new JSZip();

    let folder = zip.folder(folderTitle);
    folder.file("style.css", pageStyles);
    folder.file(fileTitle + ".html", result);

    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, fileTitle + ".zip");
    });
  };

  render() {
    return (
      <Dropdown.Item onClick={this.downloadHTML}>Скачать HTML</Dropdown.Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered,
    meta: state.meta,
    date: state.date,
    html: state.html
  };
};

export default connect(mapStateToProps)(DownloadHTML);
