module.exports = function cleanDistFolder() {
       return app.gulp.src(app.path.dist,  {"allowEmpty": true})
        .pipe(app.clean())
}