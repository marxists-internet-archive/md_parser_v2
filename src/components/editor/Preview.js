import React, { Component } from "react";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";
import "../preview/Preview.scss";

class Preview extends Component {
  componentDidMount() {
    /** parent elem with id in <EditorPane /> */
    jsAnchorNavigation("#preview");
  }

  componentDidUpdate() {
    /** parent elem with id in <EditorPane /> */
    jsAnchorNavigation("#preview");
  }

  render() {
    return (
      <div className="preview">
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered
  };
};

export default connect(mapStateToProps)(Preview);
