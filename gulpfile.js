const gulp = require("gulp");
const sass = require("gulp-sass");
const fs = require("fs-extra");
const handlebars = require("handlebars");
const { walkSync, makeFontPaths } = require("./scripts");

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
      .pipe(gulp.dest("./public/assets/temp/"));

    await gulp
      .src("./src/Fonts.scss")
      .pipe(sass())
      .pipe(gulp.dest("./public/assets/temp/"));
  },

  writeToJs: async function() {
    /* load css styles to string (string) */
    let styles = fs.readFileSync("./public/assets/temp/Preview.css", "utf8");

    let fonts = fs.readFileSync("./public/assets/temp/Fonts.css", "utf8");
    /* load css into context */
    context = {
      css: styles,
      fonts
    };

    // /* prepare template for js - legacy hopefully */
    // const compiledTemplate = await handlebars.compile(
    //   "const pageStyles = `{{{ css }}}` \n export default pageStyles;"
    // );

    const generatedCss = await handlebars.compile(
      "{{{ css }}}\n\n{{{ fonts }}}"
    );

    // const result = await compiledTemplate(context);
    const result = await generatedCss(context);

    // fs.writeFileSync("./src/components/nav/dropdown/assets/style.js", result);
    fs.writeFileSync("./public/assets/style.css", result);
  },

  copyFonts: async function() {
    const src = "./src/assets/fonts";
    const dest = "./public/assets/fonts";
    try {
      await fs.copy(src, dest);
      console.log("Fonts copied!");
    } catch (err) {
      console.error(err);
    }

    let paths = [];
    // fs.readdirSync("./src/assets/fonts").forEach(filePath => {
    //   // paths.push(filepath);
    //   console.log(filePath);
    // });

    /** make list of files */
    const list = walkSync("./src/assets/fonts");
    /**
     * add an array for font paths for easier fetching
     * generated array at ./src/components/nav/dropdown/fontPaths.js
     * fetching is done in dropdown/DownloadHTML.js
     */
    makeFontPaths(list);

    // cleanup
    try {
      await fs.remove("./public/assets/temp/");
      console.log("success!");
    } catch (err) {
      console.error(err);
    }
  }
};
