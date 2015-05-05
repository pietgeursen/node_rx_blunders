var mod = require('./module.js')

dir = process.argv[2];
ext = process.argv[3];
mod(dir,ext, function(err, data){
	data.forEach(function(file){console.log(file)});
})


