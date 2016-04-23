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

//SCSS//
import scss from 'gulp-sass';
import cleancss from 'gulp-clean-css';

//LOCAL SERVE//
import webserver from 'gulp-webserver';


const PATHS = {
  DIST: 'dist',
  DISTDIR: 'dist/**',
  DISTASSETS: 'dist/assets',
  DISTJSOUT: 'main.min.js',
  JSDIR: 'src/js/**',
  MAINJS: 'src/js/main.js',
  SCSSDIR: 'src/scss/**',
  MAINSCSS: 'src/scss/main.scss',
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


let scssbuild = ()=>{
  return gulp.src(PATHS.MAINSCSS)
    .pipe(gulpif(argv.d, scss()))
    .pipe(gulpif(!argv.d, scss({ style: 'compressed' })))
    .pipe(gulpif(!argv.d, cleancss()))
    .pipe(gulpif(!argv.d, size()))
    .pipe(gulp.dest(PATHS.DIST));
};
scssbuild.description = 'processes scss';
scssbuild.flags = {
  '-d': 'builds in dev mode (no minification)'
};
gulp.task(scssbuild);


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
  if(argv.s){
    gulp.watch(PATHS.JSDIR, (cb)=>{gulp.series('jsbuild')(); cb();});
    gulp.watch(PATHS.SCSSDIR, (cb)=>{gulp.series('scssbuild')(); cb();})
    gulp.watch(PATHS.INDEXHTML, (cb)=>{gulp.series('htmlbuild')(); cb();});
    gulp.watch(PATHS.ASSETS, (cb)=>{gulp.series('assetsbuild')(); cb();});
    gutil.log('LOADED');
  } else {
    return;
  }
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
serve.description = 'serves ./dist on localhost:8080';
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
    gulp.parallel('jsbuild', 'scssbuild', 'htmlbuild', 'assetsbuild'),
    'serve',
    'watch'
  )();
};
build.description = 'builds app';
build.flags = {};
gulp.task(build);


gulp.task('default', gulp.series('build'));
