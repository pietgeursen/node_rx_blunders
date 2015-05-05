'use strict';

module.exports = function (dir, ext, cb) {

	var fs = require('fs');
	var p = require('path');

	fs.readdir(dir, function (err, data) {
		if (err) {
			cb(err);
		} else {
			var files = data.filter(function (file) {
				return p.extname(file) === '.' + ext;
			});
			cb(null, files);
		}
	});
};
