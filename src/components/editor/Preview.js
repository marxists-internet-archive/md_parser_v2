import React, { Component } from "react";
import { connect } from "react-redux";

class Preview extends Component {
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
