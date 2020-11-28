var gulp = require("gulp");
var server = require('gulp-server-livereload')
const webpack = require('webpack-stream')


gulp.task("watch", function() {
    var config = require('./webpack.config.js')
    config.watch = true
    return gulp.src('src/main.ts')
        .pipe(webpack(config))
        .pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
    gulp.src(".")
      .pipe(server({
        livereload: true,
        open: true
      }));
  });

gulp.task('build', function(){
    return gulp.src('src/main.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task("default", gulp.parallel("watch", "webserver"))
