var gulp = require ('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-soure-stream'),
	babelify = require('bableify'),
	webserver = require('gulp-webserver'),
	sasa = require('gulp-sass');

var source_paths = {
	sass:{
		watch: './source/sass/**/*.scss',
		output: './build/css'
	},
	js: {
		main: './source/js/app.js',
		watch: './soure/js/**/*.js',
		output: './build/js'
	},
	html: {
		watch: './source/html/**/*.html'
	}	
}

gulp.task('sass', function(){
	gulp.src(source_paths.sass.watch)
		.pipe(sass.sync().on('error',sass.logError))
		.pipe(gulp.dest(source_paths.sass.output));
});

gulp.task('copy', function(){
	gulp.src(source_paths.html)
		.pipe(gulp.dest('./build'));
});

gulp.task('bowersify' function(){
	browserify([source_paths.js.main],{
			transform: ['babelify']
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(source_paths.js.output));
});

gulp.task('watch', ['sass','bowersify','copy'], function(){
	gulp.watch(source_paths.sass.watch, ['sass']);
	gulp.watch(source_paths.js.watch, ['bowersify']);
	gulp.watch(source_paths.html, ['copy']);
});