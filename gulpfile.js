var gulp = require('gulp');
var insert = require('gulp-insert');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var ts = require('gulp-typescript');

gulp.task('typescript',function(){
    gulp.src('models/**.ts')
	.pipe(ts({
	    noImplicitAny: true,
	    module: 'amd'
	}))
	.pipe(gulp.dest('app/scripts/'));
});
		 
gulp.task('default', function(cb){
    runSequence(
	['typescript'],
	cb);
});
