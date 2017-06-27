var gulp = require('gulp'),
  connect = require('gulp-connect-php'),
  browserSync = require('browser-sync').create();

webpack = require('gulp-webpack');
uglify = require('gulp-uglify');
imagemin = require('gulp-imagemin');
del = require('del');

var paths = {
  scripts: ['src/js/**/*.js'],
  images: ['src/img/**/*'],
  php: ['src/views/**/*.php']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function () {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});
gulp.task('php', function () {
  gulp.src(paths.php).pipe(gulp.dest('dist/views'));
});

gulp.task('scripts', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    // .pipe(uglify())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js'));
});
// Copy all static images
gulp.task('images', function () {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('connect-sync', function () {
  connect.server({}, function () {
    browserSync.init({
      proxy: 'localhost:8000',
      open: 'external'//INJECTA EN TODO EL DOMINIO.
    });
  });

  // Rerun the task when a file changes
  // gulp.task('watch', function () {
  //   gulp.watch(paths.scripts, ['scripts']);
  //   gulp.watch(paths.images, ['images']);
  // });

  gulp.watch(paths.scripts).on('change', function () {
    gulp.src(paths.scripts).pipe(webpack(require('./webpack.config.js'))).pipe(gulp.dest('dist/js')).pipe(browserSync.stream());
    // browserSync.reload();
  });
  // .pipe(browserSync.stream())
  gulp.watch(paths.images).on('change', function () {
    gulp.src(paths.images).pipe(imagemin({
      optimizationLevel: 5
    })).pipe(gulp.dest('dist/img')).pipe(browserSync.stream());
    // browserSync.reload();
  });

  gulp.watch(paths.php).on('change', function () {
    gulp.src(paths.php).pipe(gulp.dest('dist/views')).pipe(browserSync.stream());
    // browserSync.reload();
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts' ,'php', 'images', 'connect-sync']);