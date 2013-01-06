
var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

var toc = require('./toc');

var tocMarkdown = [];

var writeMdString = function(item, cb) {
  tocMarkdown.push('markdown/' + item + '.markdown');
  cb(null);
}

async.forEach(toc, writeMdString, function(err) {
  if (err) console.log(err);
  
  var tocMdString = tocMarkdown.join(' ');

  exec('pandoc \
    -S --epub-metadata=epub/metadata.xml \
    -o epub/nodejs-manual.epub \
    epub/title.txt \
    ' + tocMdString + '', 
    function(err, stdout, stderr) {
      if (err) console.log(err);
      console.log('all done');
    });
})