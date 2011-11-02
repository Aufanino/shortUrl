
var mongoose = require("mongoose");
var short = require("../");

mongoose.connect("mongodb://localhost/short");

var URL = "http://nodejs.org/";

short.gen(URL, function(error, shortURL) {
	if (error) {
		throw new Error(error);
	} else {
		short.get(shortURL.hash, function(error, shortURLObject) {
			if (error) {
				throw new Error(error);
			} else {
				var URL = shortURLObject[0].URL
				var hash = shortURLObject[0].hash;
				console.log(URL, hash);
				process.exit(1);
			};
		});
	}
});

/* EOF */