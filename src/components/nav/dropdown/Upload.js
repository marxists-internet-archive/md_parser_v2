import React, { Component } from "react";
import { Dropdown, Button, Modal, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { updateStore } from "../../../store/actions/editorActions";
import { uploadMeta, updateAlert } from "../../../store/actions/metaActions";
import { renderDateAlert } from "../../helpers";
import moment from "moment";
import "moment/locale/ru";

/** TODO: change to import */
const md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).use(require("markdown-it-footnote"));

const Typograf = require("typograf");
const tp = new Typograf({ locale: ["ru", "en-US"] });

/**
 * for Image upload see: https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
 */
class Upload extends Component {
  constructor(props, context) {
    super(props, context);
    this.fileReader = new FileReader();
    this.state = {
      show: false,
      textBlock: "",
      jsonBlock: ""
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
      textBlock: "",
      jsonBlock: ""
    });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  /**
   * shows preview in modal
   */
  handleFileRead = () => {
    const result = this.fileReader.result;
    const jsonBlock = /(?<=§§JSONBLOCK_START§§)([\S\s]*?)(?=§§JSONBLOCK_END§§)/gim;
    const textBlock = /(?<=§§JSONBLOCK_END§§)([\S\s]*?)*/gim;
    const matchedJSON = result.match(jsonBlock)
      ? result.match(jsonBlock)[0]
      : "ERROR";
    const matchedText = result.match(textBlock)
      ? result.match(textBlock)[0]
      : "ERROR";

    const state = this.state;
    this.setState({
      ...state,
      jsonBlock: matchedJSON,
      textBlock: matchedText
    });
  };

  handleUpload = () => {
    const state = this.state;
    const { textBlock, jsonBlock } = this.state;
    const metaObj = JSON.parse(jsonBlock);
    Object.entries(metaObj).forEach(metaField => {
      this.props.uploadMeta({
        fieldLabel: metaField[0],
        fieldValue: metaField[1]
      });
    });

    if(metaObj.date){
      this.props.updateAlert(renderDateAlert(metaObj.date, moment));
    }

    const rendered = md.render(tp.execute(textBlock));
    this.props.updateStore({
      content: textBlock.trim(),
      contentRendered: rendered,
      update: true
    });

    this.setState({
      ...state,
      show: false
    });
  };

  onChange = e => {
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(e.target.files[0]);
  };

  render() {
    const { show, jsonBlock, textBlock } = this.state;

    const filePreview = jsonBlock && (
      <Alert variant="info" style={{ fontSize: "12px" }}>
        {jsonBlock}
        <br />
        <br />
        {textBlock.substring(0, 400) + "..."}
      </Alert>
    );

    const fileError = (
      <Alert variant="danger" style={{ fontSize: "12px" }}>
        Файл не читаем!
      </Alert>
    );

    return (
      <div>
        <Dropdown.Item onClick={this.handleShow}>Загрузить MD</Dropdown.Item>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Загрузить Файл</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Загрузить файл формата .md и начать работу с ним.
            <div>
              <div className="input-group mb-3 mt-3">
                <div className="custom-file">
                  <input
                    onChange={this.onChange}
                    type="file"
                    accept=".md"
                    className="custom-file-input"
                  />
                  <label className="custom-file-label">Выбрать Файл</label>
                </div>
              </div>
            </div>
            {jsonBlock !== "ERROR" ? filePreview : fileError}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Отменить
            </Button>
            <Button variant="primary" onClick={this.handleUpload}>
              Загрузить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateStore: state => {
      dispatch(updateStore(state));
    },
    uploadMeta: state => {
      dispatch(uploadMeta(state));
    },
    updateAlert: state => {
      dispatch(updateAlert(state));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Upload);
