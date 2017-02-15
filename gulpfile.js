'use strict';

const gulp     = require('gulp');
const htmlhint = require('gulp-htmlhint');
const eslint   = require('gulp-eslint');
const connect  = require('gulp-connect');
const gulpIf   = require('gulp-if');

const paths = {
  css:  ['./style.css',  './components/**/*.css'],
  html: ['./*.html', './components/**/*.html'],
  js:   ['./script.js',   './components/**/*.js']
};

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

gulp.task('reload', function () {
  return gulp.src(paths.js, { read: false })
    .pipe(connect.reload());
});

gulp.task('html-hint', () => {
  return gulp.src(paths.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('js-lint', () => {
  return gulp.src(paths.js, { base: './' })
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
});

gulp.task('watch', () => {
  gulp.watch(paths.html, ['html-hint', 'reload']);
  gulp.watch(paths.js,   ['js-lint', 'reload']);
  gulp.watch(paths.css,  ['reload']);
});

gulp.task('connect', () => {
  connect.server({
    root: './',
    livereload: true,
    port: 8080
  });
});

gulp.task('default', [
  'js-lint',
  'html-hint',
  'watch',
  'connect'
]);
