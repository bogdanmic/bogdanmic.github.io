'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;

/**
 * The available gulp tasks
 */
gulp.task('serve', gulp.series(vendor, serveJekyll));

gulp.task('build', gulp.series(vendor, buildJekyll, htmlProofer));

/**
 * Starts the local development server
 * @param {any} cb 
 */
function serveJekyll(cb) {
    execute('jekyll serve', cb);
};

/**
 * Builds the static files for the project
 * @param {any} cb 
 */
function buildJekyll(cb) {
    execute('JEKYLL_ENV=production jekyll build', cb());
};

/**
 * Checks the resulting site built to ensure all links and images exist
 * @param {any} cb 
 */
function htmlProofer(cb) {
    execute('htmlproofer ./_site', cb);
};

/**
 * Copies all vendor dependencies in the /assets/vendor folder to be available for the build
 * @param {any} cb 
 */
function vendor(cb) {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'

    ])
        .pipe(gulp.dest('./assets/vendor'));
};

/**
 * Executes an arbitrary command
 * @param {string} command 
 * @param {any} cb 
 */
function execute(command, cb) {
    exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
};