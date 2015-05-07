'use strict';

var should = require('should');
var http = require('http');
var server = require('../server');
var Rx = require('rx');
var querystring = require('querystring');

describe('JSON Server', function () {

	var options = {
		hostname: 'localhost',
		port: 9000,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var now = new Date(Date.now());
	var iso = now.toISOString();

	var query = querystring.stringify({
		'iso': iso
	});

	describe('/api/parsetime', function () {

		beforeEach(function (done) {
			options.path = '/api/parsetime';
			server.start(9000);
			done();
		});

		it('should listen at api/parsetime', function (done) {

			var req = http.request(options, function (res) {
				res.on('end', function () {
					done();
				});
				res.on('data', function (data) {});
			});
			req.end();
		});

		it('should return a json object with hour minute and second keys', function (done) {

			var req = http.request(options, function (res) {

				res.on('data', function (d) {
					var time = JSON.parse(d.toString());
					time.should.have.keys('hour', 'minute', 'second');
					done();
				});
			});
			req.end();
		});

		it('should parse iso formatted string and return the result as json', function (done) {

			options.path += '?' + query;

			var req = http.request(options, function (res) {

				res.on('data', function (d) {
					var time = JSON.parse(d.toString());
					time.hour.should.be.equal(now.getHours());
					time.minute.should.be.equal(now.getMinutes());
					time.second.should.be.equal(now.getSeconds());

					done();
				});
			});
			req.end();
		});

		afterEach(function (done) {
			server.stop();
			done();
		});
	});

	describe('/api/unixtime', function (done) {

		beforeEach(function (done) {
			options.path = '/api/unixtime';
			server.start(9000);
			done();
		});

		it('should listen at api/unixtime', function (done) {

			var req = http.request(options, function (res) {
				res.on('end', function () {
					done();
				});
				res.on('data', function (data) {});
			});
			req.end();
		});

		it('should return a json object with unixtime key', function (done) {

			var req = http.request(options, function (res) {

				res.on('data', function (d) {
					var time = JSON.parse(d.toString());
					time.should.have.keys('unixtime');
					done();
				});
			});
			req.end();
		});

		it('should parse iso formatted string and return the result as json', function (done) {

			options.path += '?' + query;

			var req = http.request(options, function (res) {

				res.on('data', function (d) {
					var time = JSON.parse(d.toString());
					time.unixtime.should.be.equal(now.getTime());

					done();
				});
			});
			req.end();
		});

		afterEach(function (done) {
			server.stop();
			done();
		});
	});
});
