"use strict";

var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var gutil = require("gulp-util");
var glob = require("glob")
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");
var stylus = require("gulp-stylus");

var copyTask = function(options) {

  var copy = function() {
    var start = Date.now();
    console.log("Copying files");
    gulp
      .on("error", gutil.log)
      .src("./index.html")
      .pipe(gulp.dest(options.dest))
      .pipe(notify(() => console.log(
        `Files copied in ${(Date.now() - start)}ms`
      )));
  };

  copy();

};

var bundlerTask = function(options) {

  var bundler = browserify({
    entries: [options.src],
    transform: [[babelify, {presets: ["react"]}]],
    debug: options.development,
    cache: {},
    packageCache: {},
    fullPaths: options.development
  });

  var rebundle = function() {
    var start = Date.now();
    console.log("Building APP bundle");
    bundler.bundle()
      .on("error", gutil.log)
      .pipe(source("main.js"))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(() => console.log(
        `APP bundle built in ${(Date.now() - start)}ms`
      )));
  };

  if (options.development) {
    bundler = watchify(bundler);
    bundler.on("update", rebundle);
  }

  rebundle();

};

var styleTask = function(options) {

  var run = function() {
    var start = Date.now();
    console.log("Building STYLE bundle");
    gulp.src(options.src)
      .pipe(stylus({ compress: !options.development }))
      .pipe(concat("main.css"))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(() => console.log(
        `STYLE bundle built in ${(Date.now() - start)}ms`
      )));
  };
  run();

  if (options.development) {
    gulp.watch(options.src, run);
  }

};

gulp.task("default", function() {

  livereload.listen();

  bundlerTask({
    development: true,
    src: "./app/main.js",
    dest: "./build"
  });

  styleTask({
    development: true,
    src: "./styles/**/*.styl",
    dest: "./build"
  });

  copyTask({
    dest: "./build"
  });

  connect.server({
    root: "build/",
    port: 9000
  });

});
