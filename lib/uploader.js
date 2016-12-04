var child = require('child_process');
var path = require('path');
var os = require('os');

module.exports.upload = function(options, callback) {
  _prepareUploadCall(options, function(error, call) {
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
  var compiledFile = path.join(options['build-destination'], `${sketchFileName}.zip`);
  var jewelbotUploaderPath = path.join(options['jewelbots-lib'],'hardware','nRF51822', '1.0.0');
  var jewelbotUploaderExecutable;
  var userOS = os.platform();
  if (userOS === 'darwin') {
    jewelbotUploaderExecutable = 'JWBLoader_osx';
  } else if (userOS === 'win32') {
    jewelbotUploaderExecutable = 'JWBLoader.exe';
  } else if (userOS === 'linux') {
    return callback(new Error('sorry, uploading to Jewelbot is not currently supported on Linux'));
  }

  var jewelbotUploaderExecutablePath = path.join(jewelbotUploaderPath, jewelbotUploaderExecutable);

  var execScript = `${jewelbotUploaderExecutablePath} --verbose dfu serial --package=${compiledFile} --port=${options.port} --baudrate=38400`;

  return callback(null, execScript);
}
