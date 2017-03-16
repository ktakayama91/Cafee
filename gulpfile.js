var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function() {

  gulp.src('app/assets/**')
  .pipe(gulp.dest('dist/assets'))

  tsProject.src()
  .pipe(tsProject()).js
  .pipe(gulp.dest('dist'))
});