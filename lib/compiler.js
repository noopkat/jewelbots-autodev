var path = require('path');
var os = require('os');
var child = require('child_process');
var mkdirp = require('mkdirp');

module.exports.build = function(config, callback) {
  _prepare(config, function(error, options) {
    _compile(options, function(error) {
      return callback(null, error);
    });
  });
}

function _compile(options, callback) {
  // assemble all options and flags for Arduino Builder based on the facts
  var builderString = [
    options.paths.builderExec,
    '-compile',
    '-hardware="' + options.paths.hardware + '"',
    '-hardware="' + path.dirname(options.paths.jewelbotsLib) + '"',
    '-tools="' + options.paths.tools + '"',
    '-tools="' + options.paths.toolsBuilder + '"',
    '-tools="' + path.dirname(options.paths.jewelbotsLib) + '"',
    '-fqbn="Jewelbots_Arduino_Library:nRF51822:nRF51822"',
    '-built-in-libraries="' + options.paths.libs + '"',
    // customLibsArgs.join(' '),
    '-built-in-libraries="' + path.dirname(options.paths.jewelbotsLib) + '"',
    '-ide-version="10609"',
    '-build-path="' + options.paths.dest + '"',
    '-debug-level="2"',
    '-warnings=none',
    '"' + options.paths.sketchfile + '"'
  ].join(' ');

  // console.log(builderString);

  mkdirp(options.paths.dest, function(error) {
    if (error) return callback(error);
    var cp = child.exec(builderString, function(error, stdout, stderr) {
      return callback(null, error);
    });
    cp.stdout.pipe(process.stdout);
  });
}

function _prepare(config, callback) {
  var options = {
    paths: {}
  };

  var builderPath = config['arduino-app'];

  switch (os.platform()) {

    // this is not so DRY
    case 'darwin': {
      // theoretically the user would supply the direct path to the Arduino.app location, including the app file name
      builderPath = path.join(config['arduino-app'], 'Contents', 'Java');
      options.paths.builderExec = path.join(builderPath, 'arduino-builder');
      break;
    }

    case 'linux': {
      options.paths.builderExec = path.join(builderPath, 'arduino-builder');
      break;
    }

    case 'win32': {
      options.paths.builderExec = '"' + path.join(builderPath, 'arduino-builder') + '"';
      break;
    }
  }
    options.paths.tools = path.join(builderPath, 'hardware', 'tools');
    options.paths.libs =  path.join(builderPath, 'libraries');
    options.paths.hardware = path.join(builderPath, 'hardware');
    options.paths.toolsBuilder = path.join(builderPath, 'tools-builder');
    options.paths.jewelbotsLib = path.resolve(config['jewelbots-lib']);
    options.paths.dest = path.resolve(config['build-destination']);
    options.paths.sketchfile = path.resolve(config['sketch-file']);

  // make a new temp directory here, push it to the options, and return the callback.

  return callback(null, options);
}
