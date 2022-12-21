const fileInclude = require('gulp-file-include');

module.exports = function copyHtml() {
    return app.gulp.src(app.path.src.html)
        .pipe(fileInclude())
        .pipe(app.gulp.dest(app.path.build.html));
}