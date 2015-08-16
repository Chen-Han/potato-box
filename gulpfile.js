var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task("default",function(){
	return gulp.src("*.js").pipe(babel())
	.pipe(gulp.dest("dist"));
});

gulp.task("watch",function(){
	gulp.watch('*.js',['default']);
});

gulp.task('modules', function() {
    browserify({
    entries: './example.js',
    debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('output.js'))
    .pipe(gulp.dest('./dist'));
});