import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Editor from "./Editor";
import Preview from "./Preview";
import andYou from "../../assets/img/and_you.jpg";

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
            <Col  id="preview" className="preview_editor d-none d-sm-none d-md-block">
              <Preview />
            </Col>
          ) : null}

          {!this.props.view.length ? (
            <Col className="hiddenImage text-center">
              <img alt="А ты?..." src={andYou} />
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
