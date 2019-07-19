const pageStyles = `.document .preview {
  font-family: "Open Sans" !important; }
  .document .preview .nav-links a {
    color: black; }
  .document .preview p {
    hyphens: auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto; }
  .document .preview .meta {
    margin-top: 1.5em;
    padding: 1.5em;
    padding-top: 0em;
    -webkit-box-shadow: 0px 0px 5px 0px #c7c7c7;
    -moz-box-shadow: 0px 0px 5px 0px #c7c7c7;
    box-shadow: 0px 0px 5px 0px #c7c7c7;
    border-radius: 0.3em;
    font-family: "Noto Serif"; }
    .document .preview .meta h2 {
      font-size: 3em; }
    .document .preview .meta h3 {
      font-size: 2.5em;
      color: brown; }
    .document .preview .meta h4 {
      font-size: 1.3em; }
    .document .preview .meta .meta-box {
      margin-top: 2em;
      padding-top: 1em;
      border-top: 1px dashed grey; }
      .document .preview .meta .meta-box a {
        color: #5f5f5f;
        text-decoration: none;
        transition: color 0.5s;
        transition: border-bottom 0.3s;
        border-bottom: 1px solid white; }
      .document .preview .meta .meta-box a:hover {
        color: black;
        border-bottom: 1px solid black; }
      .document .preview .meta .meta-box h4 {
        margin-bottom: 0.8em;
        line-height: 1.5em; }
  .document .preview h2 {
    font-weight: bold;
    padding-top: 0.3em;
    padding-bottom: 0.2em; }
  .document .preview li {
    margin-bottom: 1em;
    margin-left: -2.4em;
    list-style-type: none;
    padding-left: 1em;
    border-left: 0.1em solid #ebe9e7; }
  .document .preview .footnotes li {
    border-left: 0.1em solid #d80000; }

@media (max-width: 415px) {
  .document .preview h1 {
    font-size: 1.4em; }
  .document .preview h2 {
    font-size: 1.3em; }
  .document .preview h3 {
    font-size: 1.2em; }
  .document .preview h4 {
    font-size: 1em; }
  .document .preview h5 {
    font-size: 1em; }
  .document .preview .meta {
    padding-top: 1.5em; }
    .document .preview .meta h1 {
      font-size: 1.4em; }
    .document .preview .meta h2 {
      font-size: 1.3em; }
    .document .preview .meta h3 {
      font-size: 1.2em;
      color: brown; }
    .document .preview .meta h4 {
      font-size: 1em; }
    .document .preview .meta h5 {
      font-size: 1em; } }

.document .container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto; }

@media (min-width: 768px) {
  .document .container {
    width: 750px; } }

@media (min-width: 992px) {
  .document .container {
    width: 970px; } }

@media (min-width: 1200px) {
  .document .container {
    width: 1170px; } }
` 
 export default pageStyles;