
var exec = require('child_process').exec;

exec('mobi/kindlegen epub/nodejs-manual.epub', function(err, stdout, stderr) {
  if (err) console.log(err);
});