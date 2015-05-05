'use strict';

var net = require('net');
var concat = require('concat-stream');
var async = require('async');
var strftime = require('strftime');

var port = process.argv[2];

if (port) {

	var server = net.createServer(function (socket) {
		var date = new Date();
		var time = date.getTime();
		socket.end(strftime('%F %R', new Date(time)) + '\n');
	}).listen(port);
}
