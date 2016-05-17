'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('vet', function(){
	return gulp
		.src([
			//only vet client code(es6 not well support by all plugins)
			'./src/client/**/*.js' 
		])
		.pipe(eslint())
		.pipe(eslint.format());
});

