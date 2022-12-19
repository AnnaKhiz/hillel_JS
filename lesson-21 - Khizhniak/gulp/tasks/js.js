const rename = require('gulp-rename');
const jsMin = require('gulp-jsmin');

module.exports = function concatJsFiles() {
    return app.gulp.src(app.path.src.jsConcat)
        .pipe(app.concat('app.js'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(rename({
            extname: '.min.js',
        }))
        .pipe(jsMin())
        .pipe(app.gulp.dest(app.path.build.js));
}

