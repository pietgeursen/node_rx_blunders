let http = require('http');
let concat = require('concat-stream');
let async = require('async');
let fs = require('fs');

let port = process.argv[2];
let file = process.argv[3]



if(port){

	let server = http.createServer((req, res) => {
	let	src = fs.createReadStream(file);
		src.pipe(res);
	}).listen(port)
	
}
