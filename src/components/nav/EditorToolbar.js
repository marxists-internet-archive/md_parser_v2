import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar
} from "react-bootstrap";
import { connect } from "react-redux";
import { updateEditorView } from "../../store/actions/navActions";

const EditorToolbar = props => {
  const handleChange = value => {
    props.updateEditorView({ view: value });
  };
  return (
    <ButtonToolbar className="editor-toolbar d-none d-sm-none d-md-block">
      <ToggleButtonGroup
        type="checkbox"
        value={props.view}
        size="sm"
        className="toggleView"
        onChange={handleChange}
      >
        {/* <ToggleButton
          className="toolbar-btn btn-outline-secondary bg-secondary text-light"
          value={1}
        >
          <div
            className="icon-contents"
            style={{ width: "14px", height: "14px" }}
          />
        </ToggleButton> */}
        &nbsp;
        <ToggleButton
          className="toolbar-btn btn-outline-secondary bg-secondary text-light"
          value={2}
        >
          <div
            className="icon-code"
            style={{ width: "14px", height: "14px" }}
          />
        </ToggleButton>
        <ToggleButton
          className="toolbar-btn btn-outline-secondary bg-secondary text-light"
          value={3}
        >
          <div
            className="icon-preview"
            style={{ width: "14px", height: "14px" }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateEditorView: state => {
      dispatch(updateEditorView(state));
    }
  };
};

const mapStateToProps = state => {
  return {
    view: state.nav.view
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorToolbar);
