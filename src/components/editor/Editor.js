import "./Editor.scss";
import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updateStore } from "../../store/actions/editorActions";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.state = {
      content: this.props.content,
      selectionStart: this.props.selectionStart
    };
  }

  componentDidMount() {
    this.textArea.current.focus();
    this.textArea.current.setSelectionRange(
      this.state.selectionStart,
      this.state.selectionStart
    );
  }

  onChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value,
        selectionStart: this.textArea.current.selectionStart
      },
      () => {
        this.props.updateStore({
          content: this.state.content,
          selectionStart: this.state.selectionStart
        });
      }
    );
  };

  /** TODO: Optimise onClick, do not send content data, add selectionEnd value */
  onClick = () => {
    this.setState(
      {
        selectionStart: this.textArea.current.selectionStart
      },
      () => {
        this.props.updateStore({
          content: this.state.content,
          selectionStart: this.state.selectionStart
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
    selectionStart: state.editor.selectionStart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStore: state => {
      dispatch(updateStore(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
