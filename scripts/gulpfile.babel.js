import path from 'path';

import gulp from 'gulp';
import sequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';

import webpackConfig from './webpack.config.prod.babel';

const inputPath = path.join(__dirname, `..`, `src`, `static`);
const outputPath = path.join(__dirname, `..`, `build`);

gulp.task(`webpack`, (callback) => (
  webpack(webpackConfig, () => {
    callback();
  })
));

gulp.task(`clean up`, () => (
  del(outputPath, {
    force: true, // because outputPath is outside of current folder
  })
));

gulp.task(`copy static`, () => (
  gulp
    .src(`${inputPath}/**/**`)
    .pipe(gulp.dest(outputPath))
));

gulp.task(`default`, () => {
  sequence(`clean up`, `webpack`, () => {
    gulp.run(`copy static`);
  });
});
