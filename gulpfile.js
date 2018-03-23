var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserify = require( 'browserify' );
var babelify = require( 'babelify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var uglify = require( 'gulp-uglify' );
var browserSync = require( 'browser-sync' ).create();
var reload = browserSync.reload;
var rtlcss = require( 'gulp-rtlcss' );

// Define BrowserSync proxy url - Replace URL with your own
var baseURL = 'iostarter.dev';

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        injectChanges: true,
        proxy: baseURL,
        // https: {
        //     key: '',
        //     cert: ''
        // },
        browser: ["google chrome", "/Applications/Firefox Developer Edition.app"]
    });
});

//Style variables
var styleSRC = 'src/scss/style.scss';
var styleDIST = './css/';

//Style task
gulp.task('style', function() {
    //compile
    gulp.src( styleSRC )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .on( 'error', console.error.bind( console ) )
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( styleDIST ) )
        .pipe( browserSync.stream() );
});

//Right to left variables
var rtlSRC = 'css/style.min.css';

//Right to left CSS
gulp.task( 'rtlcss', function() {
    gulp.src( rtlSRC )
        .pipe( rtlcss() )
        .pipe( rename({
            basename: "style-rtl",
            extname: ".min.css"
        }))
        .pipe( gulp.dest( styleDIST ) );
});

// JS variables
var jsSRC = 'script.js';
var jsFolder = 'src/js/';
var jsDIST = './js/';
var jsFILES = [jsSRC];

// JS task
gulp.task('js', function() {
    jsFILES.map(function( entry ) {
        return browserify({
            entries: [jsFolder + entry]
        })
        .transform( babelify, { presets: ['env'] } )
        .bundle()
        .pipe( source( entry) )
        .pipe( rename({ extname: '.min.js' }) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest(jsDIST) )
        .pipe( browserSync.stream() );
    });
});

//Default task
gulp.task('default', ['style', 'rtlcss', 'js']);

//Watch variables
var styleWatch = 'src/scss/**/*.scss';
var jsWatch = 'src/js/**/*.js'
var phpWatch = '**/*.php';

//Watch task
gulp.task('watch', ['default', 'browser-sync'], function() {
    gulp.watch( styleWatch, ['style', 'rtlcss'] );
    gulp.watch( jsWatch, ['js', reload] );
    gulp.watch( phpWatch, reload);
});