var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');

// build with webpack - for css modules
gulp.task('webpack', function() {
  return gulp.src('src/js/app.js')
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/build'));
});

// add bower stuff to build
gulp.task('bower', function () {
  return gulp.src([
    'bower_components/riot/riot.js',
    'bower_components/jQuery/dist/jquery.js',
    'bower_components/midilearn/midilearn.js',
    'bower_components/nexusUI/dist/nexusUI.js'
  ], {
  }).pipe(gulp.dest('dist/build/lib'));
});

// build tags with riot
gulp.task('riot', function() {
  gulp.src('./src/tags/*.tag')
    .pipe(riot())
    .pipe(gulp.dest('./src/js/tags'));
});

// add it all together
gulp.task('scripts', function() {
    gulp.src(['./src/js/tags/*.js', './src/js/*.js', '!./src/js/app.js', './dist/build/webpack-app.js'])
        .pipe(concat('euclideanBeat.js'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/build'))
})

gulp.task('default', function() {
    gulp.run('riot', 'bower', 'scripts', 'webpack');

    gulp.watch('src/tags/**/*.tag', function(event) {
        gulp.run('riot');
        gulp.run('scripts');

    });

    gulp.watch('src/js/**', function(event) {
        gulp.run('webpack');
        gulp.run('scripts');
    });

    gulp.watch('src/css/**', function(event) {
        gulp.run('webpack')
        gulp.run('scripts');
    });
})