var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['script-dev', 'sass-dev', 'sass-watch']);
gulp.task('build', ['script', 'sass']);


gulp.task('sass-dev', () => {
  gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 Chrome versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'));
});

gulp.task('sass-watch', () => {
  gulp.watch('src/sass/*.scss', ['sass-dev']);
});

gulp.task('sass', () => {
  gulp.src('src/sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 Chrome versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('script-dev', () => buildScript('main.jsx', true));
gulp.task('script', () => buildScript('main.jsx', false));

function buildScript(file, watch) {

  var props = {
    entries: ['src/js/' + file],
    debug: watch,
    transform: [
      ['babelify', { presets: ['es2015', 'react'] }],
    ],
    extensions: ['.jsx', '.js'],
  };

  var bundler;
  if (watch) {
    bundler = watchify(browserify(props));
  } else {
    bundler = browserify(props).transform({
      global: true
    }, 'uglifyify');
  }

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('content.js'))
      .pipe(gulp.dest('./'));
  }

  bundler.on('update', function() {
    var now = new Date;
    var updateStart = now.valueOf();
    var time = '\033[37m' + `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` + '\033[0m';
    rebundle();
    console.log('[' + time + '] \033[32m[watchify] Updated!', (Date.now() - updateStart) + 'ms\033[0m');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

function handleErrors() {
  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, arguments);
  this.emit('end'); //keeps gulp from hanging on this task
}
