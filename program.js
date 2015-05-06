'use strict';

var http = require('http');
var concat = require('concat-stream');
var async = require('async');
var fs = require('fs');

var port = process.argv[2];
var file = process.argv[3];

if (port) {

	var server = http.createServer(function (req, res) {
		var src = fs.createReadStream(file);
		src.pipe(res);
	}).listen(port);
}
