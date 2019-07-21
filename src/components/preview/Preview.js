import "./Preview.scss";
import { Component } from "react";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";
import { updateHtml } from "../../store/actions/htmlActions";
import { renderPreview } from "./renderPreview";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.renderedContent = "";
    this.renderPreview = renderPreview.bind(this);
  }

  componentDidMount() {
    jsAnchorNavigation("#preview");
  }

  /**
   * Duplicate this Part into the render Section of
   */
  render() {
    /**
     * Single source of true for preview/Preview.js
     * and dropdown/DownloadHTML.js components;
     */
    this.renderPreview();
    // renderedContent is declared in renderPreview();
    return this.renderedContent;
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered,
    meta: state.meta,
    date: state.date,
    html: state.html
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHtml: state => {
      dispatch(updateHtml(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
