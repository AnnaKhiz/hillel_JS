const fs = require('fs');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');

module.exports = function convertFontsToWoff2() {
    return app.gulp.src(`${app.path.src.fonts}/*.otf`, {"allowEmpty": true})
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`, {"allowEmpty": true}))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
}