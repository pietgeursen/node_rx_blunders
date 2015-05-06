let server;

exports.start = (port) => {

	let http = require('http');
	let Rx = require('rx');

	if(port){

		server = http.createServer((req, res) => {

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
				)			
			}		
		}).listen(port)
	}
}


exports.stop = () => {
	if(server)
		server.close();
}