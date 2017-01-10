'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bless = require('gulp-bless');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss     = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
gulp.task('task', function() {
    return gulp.src('./css/parent.scss')
    //    .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(concat("merged.css"))
        .pipe(autoprefixer({
			browsers: ['IE 9', 'last 2 versions']
		}))
        .pipe(bless({imports: true})
        	.on('error', function(error) {
				console.log('Message:'.red);
				console.log(error.reason);
				console.log('Snippet:'.red);
				console.log(error.source.substring(0, 160));
				console.log('');
			}))
        /*.pipe(cleanCss({
        	advanced: false,
			roundingPrecision: 4,
			// Stop it from trying to minify files included by @import
			// because bless (above) splits files into @imports and it breaks.
			processImport: false
        }))*/
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./processed-css'));
});

gulp.task('default', ['task']);
