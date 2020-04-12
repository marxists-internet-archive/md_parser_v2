import React from "react";
import { Container } from "react-bootstrap";

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

  let translated = translation.fieldValue ? translation.fieldValue : null;

  translated =
    translation.fieldValue && translationLink.fieldValue ? (
      <a href={translationLink.fieldValue}>{translation.fieldValue}</a>
    ) : (
        translated
      );

  this.renderedContent = (
    <div className="document">
      <Container className="preview" id="preview">
        <div className="nav-links">
          {/* ToDo: Inject links with frontend.js */}
          <a href="../../../../../../index.htm">МИА</a>&#160;&#160;&gt;&#160;
          <a href="../../../../../index.htm">Русский раздел</a>
          &#160;&#160;&gt;&#160;
          {/* 
            ToDo: Author generation strategy? Мб в переменных в начале прописать?
            Весь metaJson moжно в переменной прописать. Будет очень удобно для других скриптов.
           */}
          <a href="../../../index.html"> {author.fieldValue.split(" ")[0]} </a>
        </div>
        <div className="meta">
          {title && <h1>{title.fieldValue}</h1>}
          {author && <div className="author-name">{author.fieldValue}</div>}

          <div className="meta-box">
            {date && (
              <div className="meta-box_description">
                {alertResult && "Дата первого опубликования: "}
                {alertResult && alertResult}
              </div>
            )}
            {origin.fieldValue && (
              <div className="meta-box_description">
                <a href={source.fieldValue}>
                  {origin.fieldName.replace('*', '')} {origin.fieldValue}
                </a>
              </div>
            )}
            {keywords.fieldValue && (
              <div className="meta-box_description__theme_keywords">
                {keywords.fieldValue.split(", ").map(elem => `#${elem} `)}
              </div>
            )}
            {type && type.fieldValue !== "..." && (
              <div className="meta-box_description">
                {type.fieldName.replace('*', '')}: {type.fieldValue}
              </div>
            )}
            {translated && (
              <div className="meta-box_description">Перевод: {translated}</div>
            )}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.props.contentRendered }} />
      </Container>
    </div>
  );
}
