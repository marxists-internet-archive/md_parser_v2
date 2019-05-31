import "./Editor.scss";
import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  updateStore,
  updateSelection
} from "../../store/actions/editorActions";

/** TODO: change to import */
const md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).use(require("markdown-it-footnote"));

const Typograf = require("typograf");
const tp = new Typograf({ locale: ["ru", "en-US"] });

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.state = {
      content: this.props.content,
      contentRendered: this.props.contentRendered,
      selectionStart: this.props.selectionStart,
      selectionEnd: this.props.selectionEnd
    };
  }

  componentDidMount() {
    this.textArea.current.focus();
    this.textArea.current.setSelectionRange(
      this.state.selectionStart,
      this.state.selectionEnd
    );
  }

  renderMD = param => {};

  onChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value,
        selectionStart: this.textArea.current.selectionStart,
        selectionEnd: this.textArea.current.selectionEnd
      },
      () => {
        this.props.updateStore({
          content: this.state.content,
          selectionStart: this.state.selectionStart,
          selectionEnd: this.state.selectionEnd
        });
      }
    );
  };

  /** TODO: Optimise onClick, do not send content data, add selectionEnd value */
  onClick = () => {
    this.setState(
      {
        selectionStart: this.textArea.current.selectionStart,
        selectionEnd: this.textArea.current.selectionEnd
      },
      () => {
        this.props.updateSelection({
          selectionStart: this.state.selectionStart,
          selectionEnd: this.state.selectionEnd
        });
      }
    );
  };

  render() {
    return (
      <Container className="editor_container">
        <br />
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Control
                  id="content"
                  className="editor"
                  ref={this.textArea}
                  as="textarea"
                  rows="10"
                  value={this.state.content}
                  onChange={this.onChange}
                  onClick={this.onClick}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    content: state.editor.content,
    contentRendered: state.editor.contentRendered,
    selectionStart: state.editor.selectionStart,
    selectionEnd: state.editor.selectionEnd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStore: state => {
      dispatch(updateStore(state));
    },
    updateSelection: state => {
      dispatch(updateSelection(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
