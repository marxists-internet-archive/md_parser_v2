import React, { Component } from "react";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";

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
      <div>
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
