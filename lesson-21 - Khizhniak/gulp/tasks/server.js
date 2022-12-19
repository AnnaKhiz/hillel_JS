

module.exports = function startBrowserSync() {
    app.browserSync.init({
        server: {
            baseDir: `${app.path.baseDir}`,
        },
        notify: false,
        port: 3000,
    })
}