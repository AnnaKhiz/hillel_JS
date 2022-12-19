const zipAr = require('gulp-zip');

module.exports = function createZipAr() {
    return app.gulp.src(`${app.path.dist}/**/*.*`)
        .pipe(app.clean(`${app.path.rootFolder}.zip`))
        .pipe(zipAr(`${app.path.rootFolder}.zip`))
        .pipe(app.gulp.dest('./'));
}