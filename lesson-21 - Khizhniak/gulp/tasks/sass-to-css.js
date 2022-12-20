const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const groupCssMediaQueries = require('gulp-group-css-media-queries');

module.exports = function convertSassToCss() {
    return app.gulp.src(app.path.src.sass)
        .pipe(sass())
        .pipe((groupCssMediaQueries())) //group media queries
        .pipe((autoprefixer({ //add vendor prefixes for cross-browser work
            grid: true,
            overrideBrowserList: ["last 3 versions"],
            cascade: true
        })))
        .pipe(app.concat('style.css')) //concat css files in dist folder
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(rename({
            extname: '.min.css',
        })) //rename minified file
        .pipe(minify())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.browserSync.stream());
}