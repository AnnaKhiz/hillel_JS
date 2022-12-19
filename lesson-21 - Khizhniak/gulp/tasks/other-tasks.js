module.exports = function cleanDistFolder() {
    return app.gulp.src(app.path.dist, {read: false})
        .pipe(app.clean());
}