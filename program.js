'use strict';

var http = require('http');
var concat = require('concat-stream');
var async = require('async');

var urls = process.argv.slice(2);

var getUrl = function getUrl(url, cb) {

	http.get(url, function (response) {
		response.setEncoding('utf8');
		response.pipe(concat(function (data) {
			cb(null, data);
		}));
	});
};

var funcArry = urls.map(function (url) {
	return function (cb) {
		getUrl(url, cb);
	};
});

async.parallel(funcArry, function (err, results) {
	if (err) {
		console.error(err);
	} else {
		results.forEach(function (res) {
			return console.log(res);
		});
	}
});
