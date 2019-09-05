'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;
const bootlint = require('gulp-bootlint');

/**
 * The available gulp tasks
 */
gulp.task('serve', gulp.series(cleanJekyll, vendor, serveJekyll));

gulp.task('build', gulp.series(vendor, buildJekyll, htmlProoferJekyll, bootlintSite));

/**
 * Cleans the local jekyll folders
 * @param {any} cb 
 */
function cleanJekyll(cb) {
    execute('jekyll clean', cb);
};

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
    execute('JEKYLL_ENV=production jekyll build', cb);
};

/**
 * Checks the resulting site built to ensure all links and images exist
 * @param {any} cb 
 */
function htmlProoferJekyll(cb) {
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
 * Checks for several common HTML mistakes in webpages that are using Bootstrap in a fairly "vanilla" way
 * @param {any} cb 
 */
function bootlintSite(cb) {
    return gulp.src('_site/**/*.html')
        .pipe(bootlint({
            stoponerror: true,
            // bootlint options
        }));
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