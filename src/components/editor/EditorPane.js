import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Editor from "./Editor";
import Preview from "./Preview";

class EditorPane extends Component {
  render() {
    return (
      <Container className="editor_pane_container">
        <Row>
          {this.props.view.includes(2) ? (
            <Col>
              <Editor />
            </Col>
          ) : null}

          {this.props.view.includes(3) ? (
            <Col className="preview_editor d-none d-sm-none d-md-block">
              <Preview />
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.nav.view
  };
};
export default connect(mapStateToProps)(EditorPane);
