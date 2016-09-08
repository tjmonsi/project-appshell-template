var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('css-compile', function() {
    
});

var watcher = gulp.watch('src/css/*.sass', ['css-compile']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});