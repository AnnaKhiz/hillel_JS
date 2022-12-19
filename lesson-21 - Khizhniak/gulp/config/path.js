const buildFolder = './dist';
const srcFolder = './src';

module.exports = {
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
        sass: `${srcFolder}/sass/style.sass`,
        html: `${srcFolder}/files/index.html`,
        js: `${srcFolder}/files/script.js`,
        jsConcat: `${srcFolder}/files/**/*.js`,
        img: `${srcFolder}/files/img/*.png`,
    },
    watch: {
        files: `${srcFolder}/files/**/*.*`,
        sass: `${srcFolder}/sass/**/*.sass`,
        js: `${srcFolder}/files/**/*.js`,
        html: `${srcFolder}/files/**/*.html`,
        img: `${srcFolder}/files/img/*.png`,
    },
}