'use strict';

var should = require('should');
var http = require('http');
var server = require('../server');
var Rx = require('rx');

describe('Uppercase Server', function () {
	var testString = 'piet';
	var options = {
		hostname: 'localhost',
		port: 9000,
		path: '/',
		method: 'POST'
	};

	beforeEach(function () {
		server.start();
	});

	it('should return any params sent to it in Uppercase', function (done) {

		var req = http.request(options, function (res) {
			res.on('data', function (d) {
				d.toString().should.be.exactly(testString.toUpperCase());
				done();
			});
		});

		req.write(testString);
		req.end();
	});

	it('should process multiple chunks sent to it before closing the connection', function (done) {

		var testResult = '';

		var req = http.request(options, function (res) {
			res.on('data', function (d) {
				testResult += d.toString();
			});

			res.on('end', function () {
				testResult.should.be.exactly(testString.toUpperCase() + testString.toUpperCase());
				done();
			});
		});

		req.write(testString);
		req.write(testString);
		req.end();
	});

	afterEach(function () {
		server.stop();
	});
});
