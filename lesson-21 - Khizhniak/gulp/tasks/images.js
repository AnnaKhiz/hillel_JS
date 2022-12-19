const imageMin = require('gulp-imagemin');

module.exports = function copyImages() {
    return app.gulp.src(app.path.src.img)
        .pipe(imageMin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(app.gulp.dest(app.path.build.img));
}