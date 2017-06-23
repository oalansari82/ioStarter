var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	compass = require( 'gulp-compass' ),
	autoprefixer = require('gulp-autoprefixer'),
	rtlcss = require('gulp-rtlcss'),
	rename = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	reload = browserSync.reload;

var sassSources = ['sass/style.scss']
var rtlSource = ['style.css']

// Define BrowserSync proxy url - Replace URL with your own
var bs_url = 'iostarter.dev';

// Sass
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
});

// Right to left CSS
gulp.task( 'rtlcss', function() {
	gulp.src(rtlSource)
		.pipe(rtlcss())
		.pipe(rename({ 
			basename: "style-rtl",
			extname: ".css"
		}))
        .pipe(gulp.dest(''));
});

// Browsersync
gulp.task('browsersync', function() {
    browserSync({
        proxy: bs_url,
        notify: false
    });

    // Watch for changes
    gulp.watch( 'sass/**/*.scss', ['compass'] );
	gulp.watch( 'style.css', ['rtlcss'] ).on("change", reload);
	gulp.watch("**/*.php").on("change", reload);
});

// Default 
gulp.task( 'default', ['compass', 'rtlcss', 'browsersync'] );