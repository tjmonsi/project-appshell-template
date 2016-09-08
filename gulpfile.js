var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat-util');
var file = require('gulp-file');
var polymer = '../../bower_components/polymer/polymer.html';
var files = ['src/css/**/*.sass', 'src/css/**/*.scss'];

gulp.task('default', ['css-compile']);

gulp.task('css-compile', function() {
  return gulp.src(files)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('global-styles.html'))
    .pipe(concat.header('<link rel="import" href="' + polymer + '">\n\n<dom-module id="global-styles">\n<template>\n<style>\n'))
    .pipe(concat.footer('\n</style>\n</template>\n</dom-module>'))
    .pipe(gulp.dest('src/css/'))
});

var watcher = gulp.watch(files, ['css-compile']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});