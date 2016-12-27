var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	compass = require( 'gulp-compass' );

var sassSources = ['sass/style.scss']

gulp.task( 'compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			css: '',
			sass: 'sass',
			image: 'images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(''))
});

gulp.task( 'watch' , function() {
	gulp.watch( 'sass/**/*.scss', ['compass'] );
});

gulp.task( 'default', ['compass', 'watch'] );