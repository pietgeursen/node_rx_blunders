'use strict';

var server = undefined;

exports.start = function (port) {

	var http = require('http');
	var Rx = require('rx');
	var url = require('url');

	if (port) {

		server = http.createServer(function (req, res) {

			var urlObj = url.parse(req.url, true);
			var path = urlObj.pathname;
			var query = urlObj.query;

			var parsetime = function parsetime(time) {
				return {
					hour: time.getHours(),
					minute: time.getMinutes(),
					second: time.getSeconds()
				};
			};

			var unixtime = function unixtime(time) {
				return {
					unixtime: time.getTime()
				};
			};

			if (req.method === 'GET' && path === '/api/parsetime') {
				res.writeHead(200, { 'Content-Type': 'application/json' });

				var time = new Date(Date.parse(query.iso));
				var jsonResponse = JSON.stringify(parsetime(time));

				res.end(jsonResponse);
			} else if (req.method === 'GET' && path === '/api/unixtime') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				var time = new Date(Date.parse(query.iso));
				var jsonResponse = JSON.stringify(unixtime(time));

				res.end(jsonResponse);
			} else {
				res.writeHead(404);
				res.end();
			}
		}).listen(port);
	}
};

exports.stop = function () {
	if (server) server.close();
}

// req.on('end' , () => {
// 	console.log('got req end')
// 	res.end();
// })
// let source = Rx.Observable.fromEvent(req, 'data');
// let upCased = source.map(s => {
// 	return s.toString().toUpperCase();
// });
// let subscription = upCased.subscribe(
// 	e => {
// 		res.write(e);
// 	}
// )			
;
