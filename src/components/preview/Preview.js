import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

class Preview extends Component {
  render() {
    return (
      <Container>
        <br />
        <p>{this.props.content}</p>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    content: state.editor.content
  };
};

export default connect(mapStateToProps)(Preview);
