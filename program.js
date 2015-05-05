var fs = require('fs')
var p = require('path')

var path = process.argv[2];
var extension = process.argv[3];

fs.readdir(path, function(err,data){
	var files = data.filter(function(file){return p.extname(file) === ('.' + extension)})
	files.forEach(function(file){	console.log(file)	});

})

