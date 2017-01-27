var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	compass = require( 'gulp-compass' ),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	rtlcss = require('gulp-rtlcss'),
	rename = require('gulp-rename');

var sassSources = ['sass/style.scss']
var rtlSource = ['style.css']

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

gulp.task( 'rtlcss', function() {
	gulp.src(rtlSource)
		.pipe(rtlcss())
		.pipe(rename({ 
			basename: "rtl",
			extname: ".css"
		}))
        .pipe(gulp.dest(''));
});

gulp.task( 'watch', function() {
	gulp.watch( 'sass/**/*.scss', ['compass'] );
	gulp.watch( 'style.css', ['rtlcss'] );
});

gulp.task( 'default', ['compass', 'rtlcss', 'watch'] );