'use strict';

import gulp from 'gulp';
import beautify from 'gulp-beautify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const sassConfig = {
    source: './node_modules/bootstrap/scss/**/**/*',
    destination: './_sass/bootstrap/'
}, jsConfig = {
    destination: './assets/js/',
    file: 'scripts.min.js',
    source: [
        './node_modules/popper.js/dist/umd/popper.js',
        './node_modules/jquery/dist/jquery.slim.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ]
}, isProd = (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');

gulp.task('copy-sass', () => {
    return gulp.src(sassConfig.source)
      .pipe(gulp.dest(sassConfig.destination));
});

gulp.task('js', () => {
    return gulp.src(jsConfig.source)
      .pipe(sourcemaps.init())
      .pipe(concat(jsConfig.file))
      .pipe(gulpif(isProd, uglify(), beautify()))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(jsConfig.destination));
});

gulp.task('default', ['js', 'copy-sass']);
