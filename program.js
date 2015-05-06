'use strict';

var server = undefined;

exports.start = function (port) {

	var http = require('http');
	var Rx = require('rx');

	if (port) {

		server = http.createServer(function (req, res) {

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
};

exports.stop = function () {
	if (server) server.close();
};
