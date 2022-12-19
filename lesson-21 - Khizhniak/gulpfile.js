const gulp = require('gulp');
const path = require('./gulp/config/path.js');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const convertSassToCss = require('./gulp/tasks/sass-to-css.js');
const concatJsFiles = require('./gulp/tasks/js.js');
const cleanDistFolder = require('./gulp/tasks/other-tasks.js');
const startBrowserSync = require('./gulp/tasks/server.js');
const copyHtml = require('./gulp/tasks/html.js');
const copyImages = require('./gulp/tasks/images.js');
const createZipAr = require('./gulp/tasks/zip.js');

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
gulp.task('createZip', gulp.series(cleanDistFolder, copyHtml, copyImages, convertSassToCss, concatJsFiles, createZipAr));
gulp.task('run', gulp.series(cleanDistFolder, copyHtml, copyImages, convertSassToCss, concatJsFiles, gulp.parallel(watchChanges, startBrowserSync)));


