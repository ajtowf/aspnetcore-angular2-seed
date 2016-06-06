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