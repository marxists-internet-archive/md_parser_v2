import React, { Component } from "react";
import { connect } from "react-redux";
import  {jsAnchorNavigation} from "../helpers";


class Preview extends Component {
  /** TODO: add componentDidUpdate() event listeners for href="#.." elems
   * & implement anchor navigation over js.
   * see example: https://www.mediaevent.de/javascript/scroll.html
   */
  componentDidMount() {
    jsAnchorNavigation('#preview');
  }

  componentDidUpdate() {
    /** #preview id is defined in parent */
    jsAnchorNavigation('#preview');
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
