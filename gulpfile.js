const gulp = require("gulp");
const sass = require("gulp-sass");
const fs = require("fs");
let handlebars = require("handlebars");

module.exports = {
  /**
   * Transpile SCSS to CSS file
   *
   * При изменениях компонента preview/Preview.js
   * нужно выполнить npm run design:update
   * для того чтобы изменения в дизайне отображадись при скачивание
   */
  transpile: async function() {
    await gulp
      .src("./src/components/preview/Preview.scss")
      .pipe(sass())
      .pipe(gulp.dest("./src/components/nav/dropdown/assets/"));

    // await gulp
    //   .src("./src/Fonts.scss")
    //   .pipe(sass())
    //   .pipe(gulp.dest("./src/components/nav/dropdown/assets/"));
  },

  writeToJs: async function() {
    /* load css styles to string (string) */
    let styles = fs.readFileSync(
      "./src/components/nav/dropdown/assets/Preview.css",
      "utf8"
    );

    // let fonts = fs.readFileSync(
    //   "./src/components/nav/dropdown/assets/Fonts.css",
    //   "utf8"
    // );
    /* load css into context */
    context = {
      css: styles
      // fonts
    };

    /* prepare template */
    const compiledTemplate = await handlebars.compile(
      "const pageStyles = `{{{ css }}}` \n export default pageStyles;"
    );
    const result = await compiledTemplate(context);

    fs.writeFileSync("./src/components/nav/dropdown/assets/style.js", result);
  }
};
