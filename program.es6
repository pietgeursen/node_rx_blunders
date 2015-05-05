let net = require('net');
let concat = require('concat-stream');
let async = require('async');
let strftime = require('strftime');

let port = process.argv[2];

if(port){

	let server = net.createServer(socket => {
		let date = new Date();
		let time = date.getTime();
		socket.end(strftime('%F %R', new Date(time)) + '\n')

	}).listen(port)
	
}
