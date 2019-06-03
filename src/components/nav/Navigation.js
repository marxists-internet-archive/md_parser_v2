import "./Nav.scss";
import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { updateStore } from "../../store/actions/navActions";
import NavTitle from "./NavTitle";
import EditorToolbar from "./EditorToolbar";

class Navigation extends Component {
  onClick = () => {
    this.props.updateStore({
      projectTitle: <NavTitle projectTitle={this.props.projectTitle} />
    });
  };

  render() {
    const title =
      this.props.projectTitle.length > 12
        ? `${this.props.projectTitle.substring(0, 12)}...`
        : this.props.projectTitle;
    const editorToolbar =
      this.props.location.pathname === "/editor" ? <EditorToolbar /> : null;
    return (
      <Navbar className="bg-light justify-content-between mt-2 navPanel">
        <Navbar.Brand className="projectTitle" onClick={this.onClick}>
          {title}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/editor">
            <Nav.Item>Editor</Nav.Item>
          </LinkContainer>
          <LinkContainer to="/preview">
            <Nav.Item>Preview</Nav.Item>
          </LinkContainer>
          <LinkContainer to="/meta">
            <Nav.Item>Meta</Nav.Item>
          </LinkContainer>
          {editorToolbar}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectTitle: state.nav.projectTitle
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
)(Navigation);
