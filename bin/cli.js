#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var parseArgs = require('minimist');
var findPort = require('../lib/findPort');
var compiler = require('../lib/compiler');
var uploader = require('../lib/uploader');

var args = (process.argv.slice(2));
var argv = parseArgs(args, {});
var userAction = argv._[0];

handleInput(userAction);

function showHelp() {
  console.log('usage:\njewelbots-autodev compile\njewelbots-autodev upload\njewelbots-autodev help');
};

function setup(callback) {
  var configPath = path.join(process.cwd(), '.jbauto');
  var config;

  fs.exists(configPath, function(exists) {
    if (exists) {
      fs.readFile(configPath, function(error, file) {
        if (error) return callback(error);
        config = JSON.parse(file);
        return callback(null, config);
      });
    } else {
      return callback(new Error('could not find .jbauto config file in this directory, please make one :)'));
    }
  });
} 

function compileSketch(config, callback) {
  compiler.build(config, function(error) {
    return callback(error);
  });
}

function uploadSketch(config, callback) {
  findPort(function(error, port) {
    if (error) return console.log(error);
    if (!port) return console.log(new Error('could not find a connected Jewelbot.'));
    console.log('found jewelbot on port ' + port);
    config.port = port;
    uploader.upload(config, function(error) {
      return callback(error);
    });
  });
}

function handleInput(action) {
  switch (action) {
    case 'compile': {
      setup(function(error, config) {
        if (error) return console.log(error);
        console.log('compiling ' + config['sketch-file'] + '...');
        compileSketch(config, function(error) {
          if (error) return console.log(error);
          console.log('done.');
        });
      });
      break;
    }

    case 'upload': {
      setup(function(error, config) {
        if (error) return console.log(error);
        uploadSketch(config, function(error) {
          if (error) return console.log(error);
          console.log('done.');
        });
      });
      break;
    }

    case 'help': {
      showHelp();
      process.exit();
      break;
    }

    default: {
      // Invalid or no argument specified, show help and exit with an error status
      showHelp();
      process.exit(9);
      break;
    }
  }
}
