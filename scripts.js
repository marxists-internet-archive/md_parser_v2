const fs = require("fs");
const path = require("path");

/**
 * @param {String} dir directory Path
 * @param {Array} filelist array of files in folder recursively extended
 */
function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

/**
 * add an array for font paths for easier fetching
 * generated array at ./src/components/nav/dropdown/fontPaths.js
 */
function makeFontPaths(list) {
  let pathsString = "";
  list.forEach(path => {
    path = path.replace("src/assets", "");
    pathsString += "'" + path + "',\n";
  });
  pathsString = "export const fontPaths = [" + pathsString + "];";
  fs.writeFileSync("./src/components/nav/dropdown/fontPaths.js", pathsString);
}

module.exports = {
  walkSync,
  makeFontPaths
};
