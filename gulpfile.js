var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-html-prettify'),
    jade = require('gulp-jade'),
    pngquant = require('imagemin-pngquant'),
	rename = require('gulp-rename');

gulp.task('image', function () {
    return gulp.src('./img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./builds/img/'));
});

gulp.task('concat', function () {
  return gulp.src('./css/*.css')
    .pipe(concatCss("all.css"))
    .pipe(gulp.dest('./builds/css/'));
});


gulp.task('styl', function() {
    return gulp.src('./styl/*.styl')
        .pipe(stylus({
            linenos: false
        }))
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))
        .pipe(concatCss('styl.css'))
        .pipe(gulp.dest('./builds/css/'));

});


gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    return gulp.src('./jade/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(prettify({indent_char: ' ', indent_size: 3}))
        .pipe(gulp.dest('./builds/'))
});



gulp.task('css', function () {
    return gulp.src('./public/css/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/build/'));
});


gulp.task('watch', function() {
    gulp.watch("./jade/*.jade", ['jade']);
    gulp.watch("./styl/*.styl", ['styl']);
    gulp.watch("./css/*.css", ['css']);
 
});