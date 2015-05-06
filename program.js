'use strict';

var http = require('http');
// let concat = require('concat-stream');
// let async = require('async');
// let fs = require('fs');
var Rx = require('rx');

var port = process.argv[2];
var file = process.argv[3];

if (port) {

	var server = http.createServer(function (req, res) {

		if (req.method === 'POST') {
			req.on('end', function () {
				return res.end();
			});
			var source = Rx.Observable.fromEvent(req, 'data');
			var upCased = source.map(function (s) {
				return s.toString().toUpperCase();
			});
			var subscription = upCased.subscribe(function (e) {
				res.write(e);
			});
		}
	}).listen(port);
}
