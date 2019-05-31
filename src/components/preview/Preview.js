import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

class Preview extends Component {
  render() {
    return (
      <Container>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }}></div>
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
