var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var filesExist = require('files-exist');
var maps = require('gulp-sourcemaps');

var files = [
    './javascripts/jquery.flot.JUMLIB.js',
    './javascripts/jquery.flot.animate.js',
    './javascripts/jquery.flot.background.js',
    './javascripts/jquery.flot.bandwidth.js',
    './javascripts/jquery.flot.bubbles.js',
    './javascripts/jquery.flot.candlestick.js',
    './javascripts/jquery.flot.contour.js',
    './javascripts/jquery.flot.gantt.js',
    './javascripts/jquery.flot.grow.js',
    './javascripts/jquery.flot.heatmap.js',
    './javascripts/jquery.flot.mouse.js',
    './javascripts/jquery.flot.pyramid.js',
    './javascripts/jquery.flot.radar.js',
    './javascripts/jquery.flot.rectangle.js',
    './javascripts/jquery.flot.rose.js',
    './javascripts/jquery.flot.spider.js',
    './javascripts/jquery.flot.spiral.js',
    './javascripts/jquery.flot.video.js'
];

function buildFlotSource () {
    return gulp.src(filesExist(files, { exceptionMessage: 'Missing file' }))
        .pipe(concat('JUMFlot.js'))
        .pipe(gulp.dest('dist/source'));
}

function buildFlotMinified () {
    return gulp.src(filesExist(files, { exceptionMessage: 'Missing file' }))
    .pipe(maps.init())
    .pipe(babel({
        "presets": [
            "@babel/preset-env"
        ]
    }))
    .pipe(concat('JUMFlot.min.js'))
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/es5'));
}

exports.build = gulp.series(buildFlotSource, buildFlotMinified);
