const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');

module.exports = function convertSassToCss() {
    return app.gulp.src(app.path.src.sass)
        .pipe(sass())
        .pipe(app.concat('style.css')) //concat css files in dist folder
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(rename({
            extname: '.min.css',
        })) //rename minified file
        .pipe(minify())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.browserSync.stream());
}