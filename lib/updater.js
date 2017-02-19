var child = require('child_process');
var path = require('path');
var os = require('os');
var fs = require('fs');

module.exports.update = function(options, callback) {
  _prepareUpdateCall(options, function(error, call) {
    if (error) return callback(error);
    _callUpdater(call, callback);
  });
}

function _callUpdater(call, callback) {
  var cp = child.exec(call, function(error, stdout, stderr) {
    return callback(error);
  });

  cp.stdout.pipe(process.stdout);
}

function _prepareUpdateCall(options, callback) {
  var firmwareVersion = options['firmware-version'] || '1.0.0';

  var jewelbotUploaderPath = path.join(options['jewelbots-firmware'],'hardware','JWBFirmware', firmwareVersion);
  var jewelbotUploaderExecutable;
  var userOS = os.platform();

  if (userOS === 'darwin') {
    jewelbotUploaderExecutable = 'JWB_Update_mac.sh';
  } else if (userOS === 'win32') {
    jewelbotUploaderExecutable = 'JWB_Update_win.bat';
  } else if (userOS === 'linux') {
    jewelbotUploaderExecutable = 'JWB_Update_linux.sh';
  }

  var jewelbotUploaderExecutablePath = path.join(jewelbotUploaderPath, jewelbotUploaderExecutable);

  var execScript = `${jewelbotUploaderExecutablePath} ${jewelbotUploaderPath} ${options.port}`;

  return callback(null, execScript);

}
