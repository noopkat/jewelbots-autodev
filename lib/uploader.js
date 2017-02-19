var child = require('child_process');
var path = require('path');
var os = require('os');
var fs = require('fs');

module.exports.upload = function(options, callback) {
  _prepareUploadCall(options, function(error, call) {
    if (error) return callback(error);
    _callUploader(call, callback);
  });
}

function _callUploader(call, callback) {
  var cp = child.exec(call, function(error, stdout, stderr) {
    return callback(error);
  });

  cp.stdout.pipe(process.stdout);
}

function _prepareUploadCall(options, callback) {
  var sketchFileName = path.basename(options['sketch-file']);
  var fullDestPath = path.resolve(process.cwd(), options['build-destination']);
  var compiledFile = path.join(fullDestPath, `${sketchFileName}.zip`);
  var firmwareVersion = options['library-version'] || '1.0.0';

  fs.exists(compiledFile, function(exists) {
    if (!exists) {
      return callback(new Error('compiled file ' + compiledFile + ' couldn\'t be found.'));
    } else {
      var jewelbotUploaderPath = path.join(options['jewelbots-lib'],'hardware','nRF51822', firmwareVersion);
      var jewelbotUploaderExecutable;
      var userOS = os.platform();

      if (userOS === 'darwin') {
        jewelbotUploaderExecutable = 'JWBLoader_osx';
      } else if (userOS === 'win32') {
        jewelbotUploaderExecutable = 'JWBLoader.exe';
      } else if (userOS === 'linux') {
        jewelbotUploaderExecutable = 'JWBLoader_linux';
      }

      var jewelbotUploaderExecutablePath = path.join(jewelbotUploaderPath, jewelbotUploaderExecutable);

      var execScript = `${jewelbotUploaderExecutablePath} --verbose dfu serial --package=${compiledFile} --port=${options.port} --baudrate=38400`;

      return callback(null, execScript);
    }
  });
}
