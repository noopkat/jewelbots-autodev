#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var findPort = require('../lib/findPort');
var compiler = require('../lib/compiler');

// hard coded sketch file and destination for now
// var sketchfile = path.join(process.cwd(), 'sketches', 'blue.ino');
// var buildDest = path.join(process.cwd(), 'dist');

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

function compileSketch(config) {
  compiler.build(config, function(error) {
    console.log('made it to the end', error);
  });
}

function uploadSketch() {
  findPort(function(error, port) {
    console.log('found jewelbots port?', port, error);
  });
}

// test call
setup(function(error, config) {
  // see the output
  console.log(config);

  // compile?
  compileSketch(config);
});
