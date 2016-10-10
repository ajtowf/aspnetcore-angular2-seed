var paths = {
    tsSource: './scripts/*.ts',
    tsOutput: './wwwroot/app/'
};

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    merge = require('merge'),
    ts = require('gulp-typescript');

var gulp = require('gulp'),
    Q = require('q'),
    rimraf = require('rimraf');

gulp.task('clean', function (cb) {
    return rimraf('./wwwroot/lib/', cb);
});

gulp.task('copy:lib', ['clean'], function () {
    var libs = [
        "@angular",
        "systemjs",
        "core-js",
        "zone.js",
        "reflect-metadata",
        "rxjs"
    ];

    var promises = [];

    libs.forEach(function (lib) {
        var defer = Q.defer();
        var pipeline = gulp
            .src('node_modules/' + lib + '/**/*')
            .pipe(gulp.dest('./wwwroot/lib/' + lib));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });

    return Q.all(promises);
});

var tsProject = ts.createProject('./scripts/tsconfig.json');
var util = require("gulp-util");

gulp.task('ts-compile', function () {
    var tsResult = gulp.src(paths.tsSource)
        .pipe(ts(tsProject));
    return merge([tsResult.js.pipe(gulp.dest(paths.tsOutput))]);
});

// Link this to the "opening of the project" and you ll  get a compile on change.
gulp.task('watch', ['ts-compile'], function () {
    gulp.watch(paths.tsSource, ['ts-compile']);
});
