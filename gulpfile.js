var gulp = require('gulp'),
  connect = require('gulp-connect-php'),
  browserSync = require('browser-sync').create(),

  // webpack = require('gulp-webpack');
  webpack = require('webpack'),
  config = require('./webpack.config.js'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  del = require('del');

var paths = {
  scripts: ['src/js/**/*.js', 'src/css/**/*'],
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

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      gutil.log('Error', err);
      if (done) {
        done();
      }
    } else {
      Object.keys(stats.compilation.assets).forEach(function (key) {
        gutil.log('Webpack: output ', gutil.colors.green(key));
      });
      gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
      if (done) {
        done();
      }
    }
  }
}

gulp.task('scripts', function (done) {
  const compiler = webpack(config);
  compiler.run(function (err, stats) {});
  const watching = compiler.watch({
    aggregateTimeout: 300,
    poll: 1000
  }, (err, stats) => {
    // Print watch/build result here...
    console.log(stats);
  });
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
      open: 'external' //INJECTA EN TODO EL DOMINIO.
    });
  });

  gulp.watch(paths.scripts).on('change', function () {
    // gulp.src(paths.scripts).pipe(webpack(config).run(onBuild(done))).pipe(gulp.dest('dist/js')).pipe(browserSync.stream());
    // browserSync.reload();
    setTimeout(function(){
      browserSync.reload();
    }, 1000);
  
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
gulp.task('default', ['scripts', 'php', 'images', 'connect-sync']);