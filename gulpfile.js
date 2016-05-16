var gulp = require ('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	babelify = require('babelify'),
	webserver = require('gulp-webserver'),
	sass = require('gulp-sass');

var source_paths = {
	sass:{
		main: './source/sass/index.scss',
		watch: './source/sass/**/*.scss',
		output: './build/css'
	},
	js: {
		main: './source/js/app.js',
		watch: './soure/js/**/*.js',
		output: './build/js'
	},
	html: {
		main: './source/html/*.html',
		watch: './build/*.html'
	}	
}

gulp.task('webserver', function(){
	gulp.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080,
			fallback: 'index.html',
			livereload: {
				enable: true,
				port: 35730
			}
		}));
});
gulp.task('sass', function(){
	gulp.src(source_paths.sass.main)
		.pipe(sass.sync().on('error',sass.logError))
		.pipe(gulp.dest(source_paths.sass.output));
});

gulp.task('copy', function(){
	gulp.src(source_paths.html.main)
		.pipe(gulp.dest('./build'));
});

gulp.task('bowersify', function(){
	browserify(source_paths.js.main)
		.transform(babelify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(source_paths.js.output));
});

gulp.task('watch', function(){
	gulp.watch(source_paths.sass.watch, ['sass']);
	gulp.watch(source_paths.js.watch, ['bowersify']);
	gulp.watch(source_paths.html.watch, ['copy','build']);
});

gulp.task('build', ['sass','bowersify', 'copy']);
gulp.task('default', ['webserver', 'watch', 'build']);