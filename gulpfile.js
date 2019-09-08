'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;

/**
 * The available gulp tasks
 */
const vendor = gulp.parallel(vendorJs, vendorFonts);
const validate = gulp.parallel(htmlProoferJekyll);
const prepare = gulp.series(cleanJekyll, vendor);

gulp.task('serve', gulp.series(prepare, serveJekyll));

gulp.task('build', gulp.series(prepare, buildJekyll, validate));

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
 * Copies all js vendor dependencies in the /assets/js folder to be available for the build
 * @param {any} cb 
 */
function vendorJs(cb) {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'

    ])
        .pipe(gulp.dest('./assets/vendor/js'));
};

/**
 * Copies all fonts vendor dependencies in the /assets/fonts folder to be available for the build
 * @param {any} cb 
 */
function vendorFonts(cb) {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome-free/webfonts/**.*'
    ])
        .pipe(gulp.dest('./assets/vendor/fonts'));
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