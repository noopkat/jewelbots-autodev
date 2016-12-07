var Serialport = require('serialport');

/**
 * Finds a list of available USB ports, and matches for the right pid
 * Auto finds the correct port for the connected Jewelbot
 *
 * @param {function} callback - function to run upon completion/error
 */
module.exports = function findJewelbotPort(callback) {
  var _this = this;
  var jbPid = parseInt('0x6015', 16);

  _listPorts(function(error, ports) {
    // filter for a match by product id
    var portMatch = ports.filter(function(p) {
      return parseInt(p._standardPid, 16) === jbPid;
    });

    var port = null;

    if (portMatch.length) {
      port = portMatch[0].comName;
    }

    return callback(null, port);
  });
};

/**
 * Return a list of devices on serial ports. In addition to the output provided
 * by SerialPort.list, it adds a platform independent PID in _pid
 *
 * @param {function} callback - function to run upon completion/error
 */
function _listPorts(callback) {
  var foundPorts = [];

  // list all available ports
  Serialport.list(function(err, ports) {
    if (err) { return callback(err); }

    // iterate through ports
    for (var i = 0; i < ports.length; i += 1) {
      var pid;

      // are we on windows or unix?
      if (ports[i].productId) {
        pid = ports[i].productId;
      } else if (ports[i].pnpId) {
        try {
          pid = '0x' + /PID_\d*/.exec(ports[i].pnpId)[0].substr(4);
        } catch (err) {
          pid = '';
        }
      } else {
        pid = '';
      }

      ports[i]._standardPid = pid;
      foundPorts.push(ports[i]);
    }

    return callback(null, foundPorts);
  });
};
