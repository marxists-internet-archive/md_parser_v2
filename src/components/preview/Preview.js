import "./Preview.scss";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { jsAnchorNavigation } from "../helpers";

const style = {
  translation: {
    display: "inline"
  }
};

class Preview extends Component {
  componentDidMount() {
    jsAnchorNavigation("#preview");
  }

  render() {
    console.log(this.props);

    const {
      author,
      title,
      origin,
      source,
      date,
      keywords,
      type,
      translation,
      translationLink
    } = this.props.meta;
    const { alertResult } = this.props.date;

    let translated = translation.fieldValue ? (
      <h4 style={style.translation}>{translation.fieldValue}</h4>
    ) : null;

    translated =
      translation.fieldValue && translationLink.fieldValue ? (
        <h4 style={style.translation}>
          <a href={translationLink.fieldValue}>{translation.fieldValue}</a>
        </h4>
      ) : (
        translated
      );

    return (
      <Container className="preview" id="preview">
        <div className="meta">
          {author && <h2>{author.fieldValue}</h2>}
          {title && <h3>{title.fieldValue}</h3>}

          <div className="meta-box">
            {date && (
              <h4>Дата первого опубликования : {alertResult && alertResult}</h4>
            )}
            {origin && (
              <h4>
                <a href={source.fieldValue}>
                  {origin.fieldName} {origin.fieldValue}
                </a>
              </h4>
            )}
            {keywords && (
              <h4>
                <i>
                  {keywords.fieldValue.split(", ").map(elem => `#${elem} `)}
                </i>
              </h4>
            )}
            {type && type.fieldValue !== "..." && (
              <h4>
                {type.fieldName}: {type.fieldValue}
              </h4>
            )}
            {translated && (
              <span>
                <h4 style={style.translation}>Перевод: </h4>
                {translated}
              </span>
            )}
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
    meta: state.meta,
    date: state.date
  };
};

export default connect(mapStateToProps)(Preview);
