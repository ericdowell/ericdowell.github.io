'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const jsFiles = [
    './node_modules/popper.js/dist/umd/popper.js',
    './node_modules/jquery/dist/jquery.slim.js',
    './node_modules/bootstrap/dist/js/bootstrap.js'
];

gulp.task('sass', () => {
    return gulp.src('./node_modules/bootstrap/scss/**/**/*')
      .pipe(gulp.dest('./_sass/bootstrap/'));
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./assets/js/'));
});

gulp.task('default', ['js', 'sass']);
