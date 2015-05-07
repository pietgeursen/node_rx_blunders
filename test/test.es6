let should = require('should');
let http = require('http');
let server = require('../server');
let Rx = require('rx');
let querystring = require('querystring');


describe('JSON Server', () => {

	let options = {
		hostname: 'localhost',
		port: 9000,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	let now = new Date(Date.now())
	let iso = now.toISOString();

	let query = querystring.stringify({
		'iso' : iso
	})


	describe('/api/parsetime', () => {


		beforeEach((done) => {
			options.path = '/api/parsetime';
			server.start(9000);
			done();
		})

		it('should listen at api/parsetime', (done)=>{

			let req = http.request(options, res => {
				res.on('end', () => {
					done();
				})
				res.on('data', (data) => {
				})
			})
			req.end();

		})

		it('should return a json object with hour minute and second keys', (done)=>{

			let req = http.request(options, res => {
				
				res.on('data', d => {
					let time = JSON.parse(d.toString());
					time.should.have.keys('hour', 'minute', 'second');
					done();
				})
			})				
			req.end();
		})

		it('should parse iso formatted string and return the result as json', (done)=>{


			options.path += '?' + query;

			let req = http.request(options, res => {
				
				res.on('data', d => {
					let time = JSON.parse(d.toString());
					time.hour.should.be.equal(now.getHours());
					time.minute.should.be.equal(now.getMinutes());
					time.second.should.be.equal(now.getSeconds());

					done();
				})
			})				
			req.end();
		})

		afterEach((done) => {
			server.stop();
			done();
		})	
	})

	describe('/api/unixtime', done => {


		beforeEach((done) => {
			options.path = '/api/unixtime';
			server.start(9000);
			done();
		})

		it('should listen at api/unixtime', (done)=>{

			let req = http.request(options, res => {
				res.on('end', () => {
					done();
				})
				res.on('data', (data) => {
				})
			})
			req.end();
		})

		it('should return a json object with unixtime key', (done)=>{

			let req = http.request(options, res => {
				
				res.on('data', d => {
					let time = JSON.parse(d.toString());
					time.should.have.keys('unixtime');
					done();
				})
			})				
			req.end();
		})


		it('should parse iso formatted string and return the result as json', (done)=>{

			options.path += '?' + query;

			let req = http.request(options, res => {
				
				res.on('data', d => {
					let time = JSON.parse(d.toString());
					time.unixtime.should.be.equal(now.getTime());

					done();
				})
			})				
			req.end();
		})

		afterEach((done) => {
			server.stop();
			done();
		})	
	})
})