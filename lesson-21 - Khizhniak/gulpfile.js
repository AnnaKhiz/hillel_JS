const gulp = require('gulp');
const path = require('./gulp/config/path.js');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const convertSassToCss = require('./gulp/tasks/sass-to-css.js');
const concatJsFiles = require('./gulp/tasks/js.js');
const startBrowserSync = require('./gulp/tasks/server.js');
const copyHtml = require('./gulp/tasks/html.js');
const copyImages = require('./gulp/tasks/images.js');
const createZipAr = require('./gulp/tasks/zip.js');
const cleanDistFolder = require('./gulp/tasks/other-tasks.js');
const {convertFontsToWoff2, writeFontsToStyleFile} = require('./gulp/tasks/fonts.js');
//const writeFontsToStyleFile = require('./gulp/tasks/fonts.js');


global.app = {
    path,
    gulp,
    browserSync,
    concat,
    clean
}

function watchChanges() {
    gulp.watch(app.path.watch.sass, convertSassToCss);
    gulp.watch(app.path.watch.js, concatJsFiles);
    gulp.watch(app.path.watch.html, copyHtml);
    gulp.watch(app.path.watch.img, copyImages);
}

const fonts = gulp.series(convertFontsToWoff2, writeFontsToStyleFile)
const seriesTasks = gulp.series(copyHtml, copyImages, convertSassToCss, concatJsFiles);
const parallelTasks = gulp.parallel(watchChanges, startBrowserSync);

gulp.task('createZip', gulp.series(copyHtml, copyImages, convertSassToCss, concatJsFiles, createZipAr));
gulp.task('run', gulp.series(cleanDistFolder, fonts, seriesTasks, parallelTasks));


