module.exports = (dir, ext, cb) => {

	let fs = require('fs');
	let p = require('path');

	fs.readdir(dir, (err, data) => {
		if(err){
			cb(err);
		}else{
			let files = data.filter((file) => {return p.extname(file) === ('.' + ext)})
			cb(null, files);
		}
	})
}
