var fs = require('fs');
var walk = require('walk');
var mime = require('mime');

var options = {
  followLinks: false
};

var walker = walk.walk('./pdf', options);

walker.on("file", function (root, fileStats, next) {
  // remove all old files created by LaTex
  if (root === './pdf') {
    if (fileStats.name !== 'all.tex' && fileStats.name !== 'options.tex') {
      return fs.unlink('./pdf/' + fileStats.name, function (err) {
        if (err) console.log(err);
        next();
      });
    }
    next();
  }
  if (root === './pdf/sections_tex') {
    if (mime.lookup(fileStats.name) === 'application/x-tex') {
      return removeBrokenHyperref(fileStats.name, function(err){
        if (err) console.log(err);
        next();
      });
    }
    next();
  }
  next();
});

/**
 * Remove all broken hyperrefs in the latex files
 *
 * Example:
 *
 *     \hyperref[tls\_event\_secureconnect] 
 *     would cause an error and is therefore replaced with
 *     \hyperref[tls_event_secureconnect]
 *
 * @param {String} file The .tex file to look for broken refs
 * @param {Function} cb Callback function
 */
var removeBrokenHyperref = function(file, cb) {
  fs.readFile('./pdf/sections_tex/' + file, function(err, data) {
    if (err) return cb(err);
    data = data.toString();
    // find all \hyperref[...]
    var re = /hyperref\[\S+\]/gi;
    var hyperrefArray = data.match(re);
    // inside the found results look for \_ and replace with _
    var re2 = /\\_/gi;
    if (hyperrefArray) {
      Object.keys(hyperrefArray).forEach(function(key, index) {
        var value = hyperrefArray[key];
        var myString = value.replace(re2, '_');
        // replace string inside data with new string
        data = data.replace(value, myString);
        // save the new file when done
        if (index === hyperrefArray.length - 1) {
          fs.writeFile('./pdf/sections_tex/' + file, data, function(err) {
            if (err) return cb(err);
            cb(null);
          });
        }
      });
    } else {
      cb(null);
    }
  });
};

walker.on("errors", function (root, nodeStatsArray, next) {
  next();
});

walker.on("end", function () {
  console.log("all done");
});