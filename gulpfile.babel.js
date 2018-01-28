'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const sassConfig = {
    source: './node_modules/bootstrap/scss/**/**/*',
    destination: './_sass/bootstrap/'
}, jsConfig = {
    destination: './assets/js/',
    source: [
        './node_modules/popper.js/dist/umd/popper.js',
        './node_modules/jquery/dist/jquery.slim.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    output: 'scripts.min.js'
};

gulp.task('sass', () => {
    return gulp.src(sassConfig.source)
      .pipe(gulp.dest(sassConfig.destination));
});

gulp.task('js', () => {
    return gulp.src(jsConfig.source)
      .pipe(sourcemaps.init())
      .pipe(concat(jsConfig.output))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(jsConfig.destination));
});

gulp.task('default', ['js', 'sass']);
