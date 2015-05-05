let http = require('http');
let concat = require('concat-stream');
let async = require('async');

let urls = process.argv.slice(2)

let getUrl = (url, cb) => {

	http.get( url, response => {
		response.setEncoding('utf8')
		response.pipe(concat((data) => {
				cb(null,data);			
		}));
	})
}

let funcArry = 	urls.map(url => {
		return cb => {getUrl(url, cb)};
	})

async.parallel(
	funcArry,

	(err, results) => {
		if(err){
			console.error(err);
		}
		else{
			results.forEach(res => console.log(res))
		}
	}
);