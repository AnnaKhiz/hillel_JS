const buildFolder = './dist';
const srcFolder = './src';
const nodePath = require('path');
const rootFolder = nodePath.basename(nodePath.resolve())

module.exports = {
    rootFolder,
    srcFolder,
    dist: buildFolder,
    baseDir: buildFolder,
    build: {
        files: `${buildFolder}/files/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`
    },
    src: {
        files: `${srcFolder}/files/`,
        sass: `${srcFolder}/sass/*.sass`,
        html: `${srcFolder}/files/index.html`,
        js: `${srcFolder}/files/script.js`,
        jsConcat: `${srcFolder}/files/**/*.js`,
        img: `${srcFolder}/files/img/**/*.png`,
        fonts: `${srcFolder}/files/fonts/`,
    },
    watch: {
        files: `${srcFolder}/files/**/*.*`,
        sass: `${srcFolder}/sass/**/*.sass`,
        js: `${srcFolder}/files/**/*.js`,
        html: `${srcFolder}/files/**/*.html`,
        img: `${srcFolder}/files/img/`,
    },
}