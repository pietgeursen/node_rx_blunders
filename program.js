var fs = require('fs')

var fileName = process.argv[2];

fs.readFile(fileName, function(err,data){
	var num = data.toString().split('\n').length - 1;
	console.log(num);	
})

