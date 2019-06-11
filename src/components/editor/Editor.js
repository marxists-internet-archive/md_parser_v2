import "./Editor.scss";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
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

const WAIT_INTERVAL = 1000;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.willUnmount = false;
  }

  componentDidMount() {
    this.textArea.current.value = this.props.content;
    this.textArea.current.scrollTop = this.props.scrollPos;

    this.textArea.current.setSelectionRange(
      this.props.selectionStart,
      this.props.selectionEnd
    );
    this.textArea.current.focus();
    //prerender state
    this.preRender();
    this.timer = null;
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  preRender = () => {
    const rendered = md.render(tp.execute(this.textArea.current.value));
    this.props.updateStore({
      content: this.textArea.current.value,
      contentRendered: rendered
    });
  };

  onChange = () => {
    this.setState({
      content: this.textArea.current.value
    });
    this.props.updateSelection({
      selectionStart: this.textArea.current.selectionStart,
      selectionEnd: this.textArea.current.selectionEnd
    });

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.willUnmount) {
        const rendered = md.render(tp.execute(this.textArea.current.value));
        this.props.updateStore({
          content: this.state.content,
          contentRendered: rendered
        });
      }
    }, WAIT_INTERVAL);
  };

  onClick = () => {
    this.props.updateSelection({
      selectionStart: this.textArea.current.selectionStart,
      selectionEnd: this.textArea.current.selectionEnd
    });
  };

  onScroll = () => {
    this.props.updateScroll({ scrollPos: this.textArea.current.scrollTop });
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Control
            id="content"
            className="editor"
            ref={this.textArea}
            as="textarea"
            rows="10"
            onChange={this.onChange}
            onClick={this.onClick}
            onScroll={this.onScroll}
          />
        </Form.Group>
      </Form>
    );
  }
}

/** TODO: refactor editor props */
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
