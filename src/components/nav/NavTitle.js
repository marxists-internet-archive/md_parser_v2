import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";

class NavTitle extends Component {
  constructor(props) {
    super(props);
    this.titleForm = React.createRef();
    this.state = {
      projectTitle: this.props.projectTitle
    };
  }

  componentDidMount() {
    this.titleForm.current.focus();
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { onOutsideClick, onEnter } = this.props;
    return (
      <OutsideClickHandler
        onOutsideClick={() => onOutsideClick(this.state.projectTitle)}
      >
        <FormControl
          ref={this.titleForm}
          id="projectTitle"
          onChange={this.onChange}
          onKeyPress={e => onEnter(e, this.state.projectTitle)}
          value={this.state.projectTitle}
        />
      </OutsideClickHandler>
    );
  }
}
export default NavTitle;
