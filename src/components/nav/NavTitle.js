import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import { updateStore } from "../../store/actions/navActions";

/**
 * delegates local state to onOutsideClick method,
 * which subsequently maps the state to redux-property
 * destructing this component and replacing it with a plain title.
 *
 * Important, props.projectTitle to be passet NOT from the store
 * but manualy to the component. If not, you are passing an object to an object....
 */
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

  onOutsideClick = () => {
    const title = this.state.projectTitle;
    this.props.updateStore({
      projectTitle: title ? title : "Untitled..."
    });
  };

  onEnter = e => {
    const title = this.state.projectTitle;
    if (e.key === "Enter") {
      this.props.updateStore({
        projectTitle: title ? title : "Untitled..."
      });
    }
  };

  render() {
    return (
      <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
        <FormControl
          className="projectTitleInput"
          ref={this.titleForm}
          id="projectTitle"
          onChange={this.onChange}
          onKeyPress={this.onEnter}
          value={this.state.projectTitle}
        />
      </OutsideClickHandler>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateStore: state => {
      dispatch(updateStore(state));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NavTitle);
