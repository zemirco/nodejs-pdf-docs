
/**
 * Module dependencies
 */
var fs = require('fs');
var exec = require('child_process').exec;

/**
 * Table of contents
 */
var toc = require('./toc');

/**
 * Loop over .markdown files and create .tex files
 */
var value = '';

Object.keys(toc).forEach(function(key){
  value = toc[key];
  /*jshint multistr: true */
  exec('pandoc markdown/' + value + '.markdown \
    --highlight-style tango \
    -t latex \
    --indented-code-classes javascript \
    -o pdf/sections_tex/' + value + '.tex',
    function(err, stdout, stderr){
      if (err) console.log(err);
    });
});