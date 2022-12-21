const fs = require('fs');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');

function convertFontsToWoff2() {
    return app.gulp.src(`${app.path.src.fonts}/*.otf`, {"allowEmpty": true})
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`, {"allowEmpty": true}))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
        //.pipe(writeFontsToStyleFile())
}

function writeFontsToStyleFile() {
    let fontsFile = `${app.path.srcFolder}/sass/fonts.sass`;
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face\n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff")\n\tfont-weight: ${fontWeight}\n\tfont-style: normal\n\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log("Файл sass/fonts.sass уже существует. Для обновления файла нужно его удалить!");
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}

module.exports = {
    convertFontsToWoff2,
    writeFontsToStyleFile
}