import "./Nav.scss";
import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavTitle from "./NavTitle";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      projectTitle: "ProjectTitle"
    };
  }

  onClick = () => {
    this.setState({
      projectTitle: (
        <NavTitle
          onEnter={this.onEnter}
          onOutsideClick={this.onOutsideClick}
          projectTitle={this.state.projectTitle}
        />
      )
    });
  };

  /** Will be passed to NavTitle component */
  onOutsideClick = changedTitle => {
    this.setState({
      projectTitle: changedTitle ? changedTitle : "Untitled..."
    });
  };

  /** Will be passed to NavTitle component */
  onEnter = (e, changedTitle) => {
    if (e.key === "Enter") {
      this.setState({
        projectTitle: changedTitle ? changedTitle : "Untitled..."
      });
    }
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
  }
}

export default connect(mapStateToProps)(Navigation);
