'use strict';

var should = require('should');
var http = require('http');
var server = require('../program');
var Rx = require('rx');

describe('Uppercase Server', function () {

	beforeEach(function () {
		server.start();
	});

	it('should uppercase and return any params sent to it', function (done) {

		var testString = 'piet';

		var options = {
			hostname: 'localhost',
			port: 9000,
			path: '/',
			method: 'POST'
		};
		var req = http.request(options, function (res) {
			res.on('data', function (d) {
				d.toString().should.be.exactly(testString.toUpperCase());
				done();
			});
		});

		req.write(testString);
		req.end();
	});
	afterEach(function () {
		server.stop();
	});
});
