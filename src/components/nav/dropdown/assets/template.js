const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{ jsonData.author }} : {{ jsonData.title }}</title>
    <meta name="keywords" content="{{ jsonData.keywords }}" />
    <link rel="stylesheet" href="../../../../style.css">
    <link rel="stylesheet" href="./style.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif|Open+Sans:400,400i,700&display=swap&subset=cyrillic-ext" rel="stylesheet">
    <!-- metaJSON
    {{{ metaJson }}}
    metaJSON -->
  </head>
  <body>
    {{{ renderedContent }}}

  </body>
</html>
`;

export default template;
