const buildFolder = './dist';
const srcFolder = './src';
const nodePath = require('path');
const rootFolder = nodePath.basename(nodePath.resolve())

module.exports = {
    rootFolder,
    dist: buildFolder,
    baseDir: buildFolder,
    build: {
        files: `${buildFolder}/files/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
    },
    src: {
        files: `${srcFolder}/files/`,
        sass: `${srcFolder}/sass/*.sass`,
        html: `${srcFolder}/files/index.html`,
        js: `${srcFolder}/files/script.js`,
        jsConcat: `${srcFolder}/files/**/*.js`,
        img: `${srcFolder}/files/img/**/*.png`,
    },
    watch: {
        files: `${srcFolder}/files/**/*.*`,
        sass: `${srcFolder}/sass/**/*.sass`,
        js: `${srcFolder}/files/**/*.js`,
        html: `${srcFolder}/files/**/*.html`,
        img: `${srcFolder}/files/img/`,
    },
}