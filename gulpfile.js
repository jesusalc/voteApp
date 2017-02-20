var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');
var path = require('path');
/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
  nodemon({
    exec: 'node ./node_modules/babel-cli/bin/babel-node.js ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});


/**
 * Main tasks
 */

gulp.task('default', ['serve:node']);
