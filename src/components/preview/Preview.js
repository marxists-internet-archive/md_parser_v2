import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";

class Preview extends Component {
  componentDidMount() {
    jsAnchorNavigation("#preview");
  }

  render() {
    return (
      <Container id="preview">
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered
  };
};

export default connect(mapStateToProps)(Preview);
