let should = require('should');
let http = require('http');
let server = require('../server');
let Rx = require('rx');


describe('Uppercase Server', () => {
	let testString = 'piet'
	let options = {
		hostname: 'localhost',
		port: 9000,
		path: '/',
		method: 'POST'
	}

	beforeEach(() => {
		server.start();
	})

	it('should return any params sent to it in Uppercase', (done)=>{


		let req = http.request(options, res => {
			res.on('data', d => {
				d.toString().should.be.exactly(testString.toUpperCase());
				done();
			})

		})

		req.write(testString);
		req.end();
			
	})

	it('should process multiple chunks sent to it before closing the connection', (done)=>{


		let testResult = ''

		let req = http.request(options, res => {
			res.on('data', d => {
				testResult+=(d.toString())
			})

			res.on('end', () =>{
				testResult.should.be.exactly(testString.toUpperCase() + testString.toUpperCase());
				done();
			})

		})

		req.write(testString);
		req.write(testString);
		req.end();
			
	})


	afterEach(() => {
		server.stop();
	})	
})