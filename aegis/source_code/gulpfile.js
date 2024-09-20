// npm install --save-dev gulp gulp-sass gulp-scss-combine gulp-concat

    const gulp = require('gulp'),
    sass = require('gulp-sass'),
    combine = require('gulp-scss-combine'),
    concat = require('gulp-concat')

    const csssrc = './src/view/*/*.sass'
    const csssrc2 = './src/view/*/*/*.sass'
    const cssconfig = './src/view/config.sass'
    const cssfolder = './src'
    const scssfile = 'App.sass'

    gulp.task('csass',()=>gulp
    .src([cssconfig,csssrc, csssrc2]) // define a source files
    .pipe(combine()) // combine them based on @import and save it to stream
    .pipe(concat(scssfile)) // concat the stream output in single file
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssfolder))
    )

    gulp.task('default', gulp.series('csass'))

    // watch service
    const { watch, series } = require('gulp')
    exports.default = function() {
    watch(csssrc, series('csass'))
    watch(cssconfig, series('csass'))
    }
