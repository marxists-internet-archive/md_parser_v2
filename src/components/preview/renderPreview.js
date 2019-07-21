import React from "react";
import { Container } from "react-bootstrap";

const style = {
  translation: {
    display: "inline"
  }
};
/**
 * SINGLE SOURCE OF TRUE for preview/Preview.js
 * and dropdown/DownloadHTML.js components;
 * to change design the design - anything located between <body> tags
 * in the handlebars template file under (public/assets/template.html)
 * change this function.
 * Changes will show up immediately in the main Preview.
 */
export function renderPreview() {
  /**
   * set content to render
   */
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

  this.renderedContent = (
    <div className="document">
      <Container className="preview" id="preview">
        <div className="nav-links">
          <a href="../../../../../../index.htm">МИА</a>&#160;&#160;&gt;&#160;
          <a href="../../../../../index.htm">Русский раздел</a>
          &#160;&#160;&gt;&#160;
          <a href="../../../index.html"> Макаренко </a>
        </div>
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
            {keywords.fieldValue && (
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
    </div>
  );
}
