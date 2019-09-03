'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;

/**
 * The build task. Use this to build the project.
 */
gulp.task('serve', gulp.series(vendor, serveJekyll));

gulp.task('build', gulp.series(vendor, buildJekyll));

function buildJekyll(cb) {
    exec('JEKYLL_ENV=production jekyll build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function serveJekyll(cb) {
    exec('jekyll serve', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function vendor(cb) {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'

    ])
        .pipe(gulp.dest('./assets/vendor'));
};