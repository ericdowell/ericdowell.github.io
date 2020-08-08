import gulp from 'gulp';
import beautify from 'gulp-beautify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import del from 'del';

const paths = {
    sass: {
        source: './node_modules/bootstrap/scss/**/**/*',
        destination: './_sass/bootstrap/'
    },
    js: {
        file: 'scripts.min.js',
        source: [
            './node_modules/popper.js/dist/umd/popper.js',
            './node_modules/jquery/dist/jquery.slim.js',
            './node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        destination: './assets/js/'
    }
}

const isProd = (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production')

export const clean = () => del([ paths.sass.destination, paths.js.destination ]);

export function copySass() {
    return gulp.src(paths.sass.source)
      .pipe(gulp.dest(paths.sass.destination))
}

export function js() {
    return gulp.src(paths.js.source, { sourcemaps: true })
      .pipe(concat(paths.js.file))
      .pipe(gulpif(isProd, uglify(), beautify()))
      .pipe(gulp.dest(paths.js.destination))
}

const build = gulp.series(clean, gulp.parallel(js, copySass))

export default build
