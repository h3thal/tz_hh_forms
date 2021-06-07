const project_folder = 'dist';
const source_folder = '#src';
const gulp = require('gulp');
const { src, dest } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
 
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');


const path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        icon: project_folder +'/img/icon/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: source_folder + '/*.html',
        pug: source_folder + '/*.pug',
        css: source_folder + '/css/style.css',
        scss: source_folder + '/scss/*.scss',
        js: source_folder + '/js/*.js',
        img: source_folder + '/img/*.{jpg,jpeg,png,svg,gif,ico,webp}',
        icon:source_folder + '/img/icon/*.svg',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {
        html: source_folder + '/*.html',
        css: source_folder + '/css/*.css',
        js: source_folder + '/js/*.js',
        img: source_folder + '/img/**/*.{jpg, png, svg, gif, ico, webp}',
    },
    clean: './' + project_folder + '/'
}

function html() {
    return src(path.src.html)
    .pipe(dest(path.build.html))
}
function html_pug() {
    return src(path.src.pug)
    .pipe(pug())
    .pipe(dest(path.build.html))
}
function js() {
    return src(path.src.js)
    .pipe(dest(path.build.js))
}
function style() {
    return src(path.src.css)
    .pipe(dest(path.build.css))
}
function style_scss() {
    return src(path.src.scss)
    .pipe(sass.sync())
    .pipe(dest(path.build.css))
}
function image() {
    return src(path.src.img)
    .pipe(dest(path.build.img))
}
function image_icon() {
    return src(path.src.icon)
    .pipe(dest(path.build.icon))
}
function font() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}
function clean() {
    return del(path.clean)
}
function html_watch() {
    gulp.watch(path.src.pug, html_pug);
    gulp.watch(path.src.scss, style_scss);
    gulp.watch(path.src.js, js);
}

let build = gulp.series(clean,html_pug,style_scss,font,image,image_icon,js);

exports.build = build;
exports.html = html;
exports.html_pug = html_pug;
exports.font = font;
exports.js = js;
exports.style = style;
exports.image = image;
exports.image_icon = image_icon;
exports.style_scss = style_scss;
exports.html_watch = html_watch;