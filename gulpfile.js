var gulp = require( 'gulp' ),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	rtlcss = require('gulp-rtlcss'),
	rename = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	reload = browserSync.reload;

var sassSources = ['sass/style.scss']
var rtlSource = ['style.css']

// Define BrowserSync proxy url - Replace URL with your own
var bs_url = 'iostarter.dev';

// Sass
// CSS processing
gulp.task('css', function() {

	var postCssOpts = [
	assets({ loadPaths: ['images/'] }),
	autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
	mqpacker
	];

	return gulp.src(sassSources)
	  .pipe(sass({
		outputStyle: 'compressed',
		imagePath: 'images/',
		precision: 3,
		errLogToConsole: true
	  }))
	  .pipe(postcss(postCssOpts))
	  .pipe(gulp.dest(''));

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
		injectChanges: true,
        proxy: bs_url,
		notify: false,
		// Open the site in Chrome & Firefox
		browser: ["google chrome", "/Applications/Firefox Developer Edition.app"]
    });

    // Watch for changes
    gulp.watch( 'sass/**/*.scss', ['css'] ).on("change", function(e) {
		return gulp.src(e.path)
			.pipe(browserSync.reload({stream: true}));
	});
	gulp.watch( 'style.css', ['rtlcss'] ).on("change", function(e) {
		return gulp.src(e.path)
			.pipe(browserSync.reload({stream: true}));
	});
	gulp.watch("**/*.php").on("change", function(e) {
		return gulp.src(e.path)
			.pipe(browserSync.reload({stream: true}));
	});
});

// Default
gulp.task( 'default', ['css', 'rtlcss', 'browsersync'] );