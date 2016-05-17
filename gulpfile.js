'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});
$.eslint = require('gulp-eslint'); //don't know why

gulp.task('vet', function(){
	log('Analyzing source with ESLint');

	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError());
});

gulp.task('styles', ['clean-styles'], function() {
	log('Compiling Sass --> CSS');

	return gulp
		.src(config.sass)
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(){
	return clean(config.temp + '**/*.css');
});

gulp.task('sass-watcher', function(){
	gulp.watch([config.sass], ['styles']);
}) 


/* Helper */

function clean(path) {
	log('Cleaning: ' + $.util.colors.blue(path));
	return del(path);
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.blue(msg));
	}
}