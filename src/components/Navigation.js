import "./Nav.scss";
import React, { Component } from "react";
import { Navbar, Nav, FormControl } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.state = {
      input: false,
      projectTitle: "ProjectTitle"
    };
  }

  onChange = e => {
    //ToDo
    return;
  };

  toggleInput = () => {
    if (this.state.input === false) {
      const titleInput = (
        <OutsideClickHandler
          onOutsideClick={() => {
            this.setState({
              projectTitle: this.title.current.value,
              input: false
            });
          }}
        >
          <FormControl
            ref={this.title}
            onChange={this.onChange}
            onKeyPress={this.toggleTitleEnter}
            value={this.state.projectTitle}
          />
        </OutsideClickHandler>
      );

      this.setState(
        {
          projectTitle: titleInput,
          input: true
        },
        () => {
          this.title.current.focus();
        }
      );
    }
  };

  toggleTitleEnter = e => {
    if (e.key === "Enter") {
      if (this.state.input === true) {
        this.setState({
          projectTitle: this.title.current.value,
          input: false
        });
      }
    }
  };

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        <Navbar.Brand onClick={this.toggleInput}>
          {this.state.projectTitle}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
