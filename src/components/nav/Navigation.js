import "./Nav.scss";
import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavTitle from "./NavTitle";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { updateStore } from "../../store/actions/navActions";
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
    return (
      <Navbar className="bg-light justify-content-between mt-2">
        <Navbar.Brand className="projectTitle" onClick={this.onClick}>
          {title}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/home">
            <Nav.Item>Home</Nav.Item>
          </LinkContainer>
          <LinkContainer to="/editor">
            <Nav.Item>Editor</Nav.Item>
          </LinkContainer>
          <LinkContainer to="/preview">
            <Nav.Item>Preview</Nav.Item>
          </LinkContainer>
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
