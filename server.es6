let server;

exports.start = (port) => {

	let http = require('http');
	let Rx = require('rx');
	let url = require('url');

	if(port){

		server = http.createServer((req, res) => {			

			let urlObj = url.parse(req.url, true);
			let path = urlObj.pathname;
			let query = urlObj.query;

			let parsetime = time => {
				return {
					hour: time.getHours(),
					minute: time.getMinutes(),
					second: time.getSeconds()
				}
			}

			let unixtime = time =>{
				return {
					unixtime: time.getTime()
				}
			}


			if(req.method === 'GET' && path === '/api/parsetime' ){
				res.writeHead(200, { 'Content-Type': 'application/json' })

				let time  = new Date(Date.parse(query.iso));
				let jsonResponse = JSON.stringify(parsetime(time));

				res.end(jsonResponse);

			}	

			else if(req.method === 'GET' && path === '/api/unixtime' ){
				res.writeHead(200, { 'Content-Type': 'application/json' })
				let time  = new Date(Date.parse(query.iso));
				let jsonResponse = JSON.stringify(unixtime(time));

				res.end(jsonResponse);

			}

			else{
				res.writeHead(404);
				res.end();

			}		
		}).listen(port)
	}
}


exports.stop = () => {
	if(server)
		server.close();
}






				// req.on('end' , () => {
				// 	console.log('got req end')
				// 	res.end();
				// })
				// let source = Rx.Observable.fromEvent(req, 'data');
				// let upCased = source.map(s => {
				// 	return s.toString().toUpperCase();
				// });
				// let subscription = upCased.subscribe(
				// 	e => {
				// 		res.write(e);
				// 	}
				// )			