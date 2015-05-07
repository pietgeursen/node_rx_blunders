let server;

exports.start = (port) => {

	let http = require('http');
	let Rx = require('rx');
	let url = require('url');

	let getPathFromReq = (req) =>{
		return url.parse(req.url,true).pathname
	}

	let getQueryFromReq = (req) => {
		return url.parse(req.url,true).query		
	}

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

	let timeFromQuery = query =>{
		return new Date(Date.parse(query.iso));
	}

	if(port){

		server = http.createServer().listen(port)

		let requests = Rx.Observable.fromEvent(server, 'request', (args) => {return {req:args[0], resp:args[1]}});


		let requestsWithTimeResponses = requests.map(x =>{
			
			let query = getQueryFromReq(x.req);
			let time = timeFromQuery(query);

			let path = getPathFromReq(x.req)

			if(path  === '/api/parsetime'){
				x.jsonResponse = JSON.stringify(parsetime(time));
			}else if(path  === '/api/unixtime'){
				x.jsonResponse = JSON.stringify(unixtime(time));
			}
			return x;
		})

		

		let subscription = requestsWithTimeResponses.subscribe(
		    x => {
    			x.resp.end(x.jsonResponse);
		    },
		    err => {
		        console.log('Error: ' + err);
		    },
		    () => {
		        console.log('Completed');
		    });
	}
}


exports.stop = () => {
	if(server)
		server.close();
}

	