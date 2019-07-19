const pageStyles = `.preview {
  font-family: "Open Sans" !important; }
  .preview .nav-links a {
    color: black; }
  .preview p {
    hyphens: auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto; }
  .preview .meta {
    margin-top: 1.5em;
    padding: 1.5em;
    padding-top: 0em;
    -webkit-box-shadow: 0px 0px 5px 0px #c7c7c7;
    -moz-box-shadow: 0px 0px 5px 0px #c7c7c7;
    box-shadow: 0px 0px 5px 0px #c7c7c7;
    border-radius: 0.3em;
    font-family: "Noto Serif"; }
    .preview .meta h2 {
      font-size: 3em; }
    .preview .meta h3 {
      font-size: 2.5em;
      color: brown; }
    .preview .meta h4 {
      font-size: 1.3em; }
    .preview .meta .meta-box {
      margin-top: 2em;
      padding-top: 1em;
      border-top: 1px dashed grey; }
      .preview .meta .meta-box a {
        color: #5f5f5f;
        text-decoration: none;
        transition: color 0.5s;
        transition: border-bottom 0.3s;
        border-bottom: 1px solid white; }
      .preview .meta .meta-box a:hover {
        color: black;
        border-bottom: 1px solid black; }
      .preview .meta .meta-box h4 {
        margin-bottom: 0.8em;
        line-height: 1.5em; }
  .preview h2 {
    font-weight: bold;
    padding-top: 0.3em;
    padding-bottom: 0.2em; }
  .preview li {
    margin-bottom: 1em;
    margin-left: -2.4em;
    list-style-type: none;
    padding-left: 1em;
    border-left: 0.1em solid #ebe9e7; }
  .preview .footnotes li {
    border-left: 0.1em solid #d80000; }

@media (max-width: 415px) {
  .preview h1 {
    font-size: 1.4em; }
  .preview h2 {
    font-size: 1.3em; }
  .preview h3 {
    font-size: 1.2em; }
  .preview h4 {
    font-size: 1em; }
  .preview h5 {
    font-size: 1em; }
  .preview .meta {
    padding-top: 1.5em; }
    .preview .meta h1 {
      font-size: 1.4em; }
    .preview .meta h2 {
      font-size: 1.3em; }
    .preview .meta h3 {
      font-size: 1.2em;
      color: brown; }
    .preview .meta h4 {
      font-size: 1em; }
    .preview .meta h5 {
      font-size: 1em; } }

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto; }

@media (min-width: 768px) {
  .container {
    width: 750px; } }

@media (min-width: 992px) {
  .container {
    width: 970px; } }

@media (min-width: 1200px) {
  .container {
    width: 1170px; } }
` 
 export default pageStyles;