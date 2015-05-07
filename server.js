'use strict';

var server = undefined;

exports.start = function (port) {

	var http = require('http');
	var Rx = require('rx');
	var url = require('url');

	var getPathFromReq = function getPathFromReq(req) {
		return url.parse(req.url, true).pathname;
	};

	var getQueryFromReq = function getQueryFromReq(req) {
		return url.parse(req.url, true).query;
	};

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

	var timeFromQuery = function timeFromQuery(query) {
		return new Date(Date.parse(query.iso));
	};

	if (port) {

		server = http.createServer().listen(port);

		var requests = Rx.Observable.fromEvent(server, 'request', function (args) {
			return { req: args[0], resp: args[1] };
		});

		var requestsWithTimeResponses = requests.map(function (x) {

			var query = getQueryFromReq(x.req);
			var time = timeFromQuery(query);

			var path = getPathFromReq(x.req);

			if (path === '/api/parsetime') {
				x.jsonResponse = JSON.stringify(parsetime(time));
			} else if (path === '/api/unixtime') {
				x.jsonResponse = JSON.stringify(unixtime(time));
			}
			return x;
		});

		var subscription = requestsWithTimeResponses.subscribe(function (x) {
			x.resp.end(x.jsonResponse);
		}, function (err) {
			console.log('Error: ' + err);
		}, function () {
			console.log('Completed');
		});
	}
};

exports.stop = function () {
	if (server) server.close();
};
