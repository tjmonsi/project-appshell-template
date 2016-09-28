var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat-util');
// var replace = require('gulp-replace');
var tap = require('gulp-tap');
var path = require('path');
var polymer = '../bower_components/polymer/polymer.html';

gulp.task('default', ['css-index-compile', 'css-compile']);

function setToCorrectFontPath(file) {
  file.contents = new Buffer(String(file.contents)
    .replace(/url\('/g, "url('/fonts" + file.path.replace(/.*\/fonts/g, '').replace(new RegExp(path.posix.basename(file.path)), ''))
  );
}

// ### Custom tasks
// Take all the fontcss stylesheets and concat them into a single SCSS file
gulp.task ('font-css', function() {
  return gulp.src(['fonts/**/stylesheet.css']) //Gather up all the 'stylesheet.css' files
    .pipe(tap(setToCorrectFontPath))
    .pipe(concat('main.scss')) //Concat them all into a single file
    .pipe(concat.header('/* !!! WARNING !!! \nThis file is auto-generated. \nDo not edit it or else you will lose changes next time you compile! */\n\n'))
    .pipe(gulp.dest('src/sass/fonts/')); // Put them in the assets/styles/components folder
});

gulp.task('css-index-compile', ['font-css'], function() {
  return gulp.src('src/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('src/'));
});

gulp.task('css-compile', function() {
  return gulp.src('src/sass/core-styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('core-styles.html'))
    .pipe(concat.header('<link rel="import" href="' + polymer + '">\n\n<dom-module id="core-styles">\n<template>\n<style>\n'))
    .pipe(concat.footer('\n</style>\n</template>\n</dom-module>'))
    .pipe(gulp.dest('src/'));
});

var fontWatcher = gulp.watch(['fonts/**/*', 'src/sass/base/*'], ['css-index-compile']);
fontWatcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

var watcher = gulp.watch(['src/sass/**/*'], ['css-compile']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});