import gulp from 'gulp';
import gutil from 'gulp-util';
import {argv} from 'yargs';
import gulpif from 'gulp-if';

import del from 'del';

import size from 'gulp-size';


//JS//
import browserify from 'browserify';
import envify from 'loose-envify/custom';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import 'babelify';
import uglify from 'gulp-uglify';

//LOCAL SERVE//
import webserver from 'gulp-webserver';


const PATHS = {
  DIST: 'dist',
  DISTDIR: 'dist/**',
  DISTASSETS: 'dist/assets',
  DISTJSOUT: 'main.min.js',
  JSDIR: 'src/js/**',
  MAINJS: 'src/js/main.js',
  ASSETS: 'src/assets/**',
  INDEXHTML: 'src/index.html',
};


let jsbuild = ()=>{
  return browserify(PATHS.MAINJS)
    .transform(envify({ _: 'purge', NODE_ENV: (argv.d) ? 'development' : 'production' }), { global: true })
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('browserify-css', { autoInject: true, minify: true })
    .bundle()
    .pipe(source(PATHS.DISTJSOUT))
    .pipe(buffer())
    .pipe(gulpif(!argv.d, uglify()))
    .pipe(gulpif(!argv.d, size()))
    .pipe(gulp.dest(PATHS.DIST));
};
jsbuild.description = 'bundles javascript and css';
jsbuild.flags = {
  '-d': 'builds in dev mode (no minification)'
};
gulp.task(jsbuild);


let htmlbuild = ()=>{
  return gulp.src(PATHS.INDEXHTML)
    .pipe(gulp.dest(PATHS.DIST));
};
htmlbuild.description = 'transfers html';
htmlbuild.flags = {};
gulp.task(htmlbuild);


let assetsbuild = ()=>{
  return gulp.src(PATHS.ASSETS)
    .pipe(gulp.dest(PATHS.DIST));
};
assetsbuild.description = 'transfers assets';
assetsbuild.flags = {};
gulp.task(assetsbuild);


let watch = ()=>{
  gulp.watch(PATHS.JSDIR, gulp.series('jsbuild'));
  gulp.watch(PATHS.INDEXHTML, gulp.series('htmlbuild'));
  gulp.watch(PATHS.ASSETS, gulp.series('assetsbuild'));
  gutil.log('LOADED');
};
watch.description = 'watches js, css, html, assets';
watch.flags = {};
gulp.task(watch);


let clean = ()=>{
  return del([PATHS.DIST]);
};
clean.description = 'cleans dist';
clean.flags = {};
gulp.task(clean);


let serve = (cb)=>{
  return gulp.src(PATHS.DIST)
    .pipe(gulpif(argv.s, webserver({
      livereload: true,
      port: 8080,
      fallback: 'index.html'
    })));
};
serve.description = 'serves ./dist at localhost:8080';
serve.flags = {
  '-s': 'serves application on localhost'
};
gulp.task(serve);

/*
FLAGS
-s | serves app
-d | dev output (default is production)
*/
let build = ()=>{
  return gulp.series(
    'clean',
    gulp.parallel('jsbuild', 'htmlbuild', 'assetsbuild'),
    'serve',
    'watch'
  )();
};
build.description = 'builds app';
build.flags = {};
gulp.task(build);


gulp.task('default', gulp.series('build'));
