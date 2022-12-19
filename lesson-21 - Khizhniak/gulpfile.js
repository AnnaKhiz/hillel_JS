const gulp = require('gulp');
const path = require('./gulp/config/path.js');
const browserSync = require('browser-sync');
const convertSassToCss = require('./gulp/tasks/sass-to-css.js');
const concatJsFiles = require('./gulp/tasks/js.js');
const cleanDistFolder = require('./gulp/tasks/otherTasks.js');
const startBrowserSync = require('./gulp/tasks/server.js');
const copyHtml = require('./gulp/tasks/html.js');
const copyImages = require('./gulp/tasks/images.js');

global.app = {
    path,
    gulp,
    browserSync,
}

function watcher() {
    gulp.watch(app.path.watch.sass, convertSassToCss);
    gulp.watch(app.path.watch.js, concatJsFiles);
    gulp.watch(app.path.watch.html, copyHtml);
    gulp.watch(app.path.watch.img, copyImages);
}

gulp.task('def', convertSassToCss);
gulp.task('clean', cleanDistFolder);
gulp.task('copyHtml', copyHtml);
gulp.task('copyImages', copyImages);
gulp.task('watcher', watcher);
gulp.task('reloadBrowser', startBrowserSync);
gulp.task('concatFiles', concatJsFiles)

gulp.task('run', gulp.series(cleanDistFolder, copyHtml, copyImages, convertSassToCss, concatJsFiles, gulp.parallel(watcher, startBrowserSync)));


