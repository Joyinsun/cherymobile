var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $tsc = require('gulp-typescript'),
    $smap = require('gulp-sourcemaps'),
    $del = require('del'),
    pkg = require('./package.json');

var src = {
    ts: 'src/**/*.{ts,tsx}',
    static: 'src/**/*.{html,css}'
};

var tsProject = $tsc.createProject("tsconfig.json");

var dst = {
    _: "dist",
    img: 'img'
};

$gulp.task('clear', function() {
    $del(dst._ + '/*');
});

$gulp.task('ts:lint', function() {
    return $gulp.src(src.ts)
        //return $gulp.src("src/roleA/**/*.tsx")
        .pipe($lint({
            formatter: 'codeFrame'
        }))
        .pipe($lint.report())
});

$gulp.task('ts:compile', function() {
    return tsProject.src()
        .pipe($smap.init())
        .pipe(tsProject())
        .pipe($smap.write("./"))
        .pipe($gulp.dest('dist'));
});

$gulp.task('bundle:static', function() {
    return $gulp.src(src.static)
        .pipe($gulp.dest('dist'));
});

$gulp.task('ts:debug', ['ts:lint', 'ts:compile']);

$gulp.task('bundle:debug', ['ts:debug', 'bundle:static']);

$gulp.task('watch', function() {
    $gulp.watch([src.ts, src.static], ['bundle:debug']);
});