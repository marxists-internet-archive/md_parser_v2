import "./Preview.scss"
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";

class Preview extends Component {
  componentDidMount() {
    jsAnchorNavigation("#preview");
  }

  render() {
    console.log(this.props.meta);
    const {author, title, origin, source} = this.props.meta;
    
    return (
      <Container className="preview" id="preview">
      <div className="meta">      
        {author && <h2>{author.fieldValue}</h2>}
        {title && <h3>{title.fieldValue}</h3>}
        <div className="meta-box">
            {origin && <h4><a href={source.fieldName}>{origin.fieldName} {origin.fieldValue}</a></h4>}
        </div>

      </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentRendered: state.editor.contentRendered,
    meta: state.meta
    
  };
};

export default connect(mapStateToProps)(Preview);
