var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	compass = require( 'gulp-compass' ),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');;

var sassSources = ['sass/style.scss']

gulp.task( 'compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			css: '',
			sass: 'sass',
			image: 'images',
			style: 'expanded'
		}))
		.pipe(autoprefixer())
		.on('error', gutil.log)
		.pipe(gulp.dest(''))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
    	.pipe(gulp.dest(''));
});

gulp.task( 'watch', function() {
	gulp.watch( 'sass/**/*.scss', ['compass'] );
});

gulp.task( 'default', ['compass', 'watch'] );