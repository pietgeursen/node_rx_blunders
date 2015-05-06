let http = require('http');
// let concat = require('concat-stream');
// let async = require('async');
// let fs = require('fs');
let Rx = require('rx');

let port = process.argv[2];
let file = process.argv[3];

if(port){

	let server = http.createServer((req, res) => {

		if(req.method === 'POST'){
			req.on('end' , () => res.end())
			let source = Rx.Observable.fromEvent(req, 'data');
			let upCased = source.map(s => {
				return s.toString().toUpperCase();
			});
			let subscription = upCased.subscribe(
				e => {
					res.write(e);
				}
			);
			
		}		
	}).listen(port)
	
}
