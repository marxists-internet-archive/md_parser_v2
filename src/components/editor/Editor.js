import "./Editor.scss";
import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  updateStore,
  updateSelection,
  updateScroll
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
  }

  componentDidMount() {
    this.textArea.current.focus();
    this.textArea.current.setSelectionRange(
      this.props.selectionStart,
      this.props.selectionEnd
    );
    this.textArea.current.scrollTop = this.props.scrollPos;
    //prerender state
    this.onChange()

  }


  onChange = () => {
    const rendered = md.render(tp.execute(this.textArea.current.value));
        this.props.updateStore({
          content: this.textArea.current.value,
          contentRendered: rendered,
          selectionStart: this.textArea.current.selectionStart,
          selectionEnd: this.textArea.current.selectionEnd
        });
  };

  onClick = () => {
        this.props.updateSelection({
          selectionStart: this.textArea.current.selectionStart,
          selectionEnd: this.textArea.current.selectionEnd
        });
  };

  onScroll = () => {
    this.props.updateScroll({ scrollPos: this.textArea.current.scrollTop})
  }



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
                  value={this.props.content}
                  onChange={this.onChange}
                  onClick={this.onClick}
                  onScroll={this.onScroll}
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
    selectionEnd: state.editor.selectionEnd,
    scrollPos: state.editor.scrollPos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStore: state => {
      dispatch(updateStore(state));
    },
    updateSelection: state => {
      dispatch(updateSelection(state));
    },
    updateScroll: state => {
      dispatch(updateScroll(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
