let http = require('http')
let concat = require('concat-stream')

let url = process.argv[2];

http.get( url, response => {
	response.setEncoding('utf8')
	response.pipe(concat((err,data) => {
		if(err)
			return console.error(err);
		console.log(data.length);
		console.log(data);
	}));

})