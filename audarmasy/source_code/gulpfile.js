import gulp from "gulp";
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { default as concat } from 'gulp-concat'
import { default as combine } from 'gulp-scss-combine';
const sass = gulpSass(dartSass);

const cssfolder = './src'
const sassfile = 'App.sass'

const sassies = './src/**/*.sass'


gulp.task('csass', () => gulp
    .src([sassies]) // define a source files
    .pipe(combine()) // combine them based on @import and save it to stream
    .pipe(concat(sassfile)) // concat the stream output in single file
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssfolder))
)



gulp.task('default', gulp.series('csass'))



export default function () {
    gulp.watch(sassies, gulp.series('csass'))
}


//// THIS GULPFILE IS VALID FOR VITE AS OF 14 Nov 2023