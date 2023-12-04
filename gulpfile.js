const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-clean-css');
const del = require('del');
const uglify = require('gulp-uglify');
const tinypng = require('gulp-tinypng');
const htmlmin = require('gulp-htmlmin');
const iconv = require('gulp-iconv');
const typograf = require('gulp-typograf');
const fileinclude = require('gulp-file-include');

function buildHtml(done) {
    src('src/**.htm')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(typograf({ locale: ['ru', 'en-US'],
            safeTags: [
                ['<no-typography>', '</no-typography>']
            ]}))
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        // }))
        // .pipe(iconv({
        //     decoding: 'utf8',
        //     encoding: 'win1251'
        // }))
        .pipe(dest('dist/'))
    done();
}

function buildCss(done) {
    src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        // .pipe(cssmin())
        .pipe(dest('dist/css/'))
    done();
}

function buildJs(done) {
    src('src/js/**/*.js')
        // .pipe(uglify())
        .pipe(dest('dist/js/'))
    done();
}

function buildImg(done) {
    src('src/images/**/*.{png,jpg,jpeg,svg}')
        .pipe(dest('dist/images/'))
    done();
}

function cleanHtml(done) {
    del(['dist/*.htm']);
    done();
}
function cleanCss(done) {
    del(['dist/css/*.css']);
    done();
}
function cleanJs(done) {
    del(['dist/js/*.js']);
    done();
}
function cleanImg(done) {
    del(['dist/images/*.{png,jpg,jpeg,svg}']);
    done();
}
function watcher() {
    watch('src/**/*.htm', series('buildHtml'));
    watch('src/**/*.scss', series('buildCss'));
    watch('src/**/*.js', series('buildJs'));
}

exports.cleanHtml = cleanHtml;
exports.cleanCss = cleanCss;
exports.cleanJs = cleanJs;
exports.cleanImg = cleanImg;
exports.buildHtml = buildHtml;
exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.buildImg = buildImg;
exports.watcher = watcher;
exports.default = series(cleanHtml, buildHtml, cleanCss, buildCss, cleanJs, buildJs, cleanImg, buildImg, watcher);