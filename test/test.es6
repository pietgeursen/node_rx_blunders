let should = require('should');
let http = require('http');
let server = require('../program');
let Rx = require('rx');


describe('Uppercase Server', () => {

	beforeEach(() => {
		server.start();
	})

	it('should uppercase and return any params sent to it', (done)=>{

		let testString = 'piet'

		let options = {
			hostname: 'localhost',
			port: 9000,
			path: '/',
			method: 'POST'
		}
		let req = http.request(options, res => {
			res.on('data', d => {
				d.toString().should.be.exactly(testString.toUpperCase());
				done();
			})

		})

		req.write(testString);
		req.end();
			
	})
	afterEach(() => {
		server.stop();
	})	
})