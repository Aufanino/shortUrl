
// core
var mongoose = require("mongoose");
var base = require("base-converter");

var ShortURL = require(__dirname + "/../models/ShortURL.js");

function hesher(URL) {
	//Generates a 3 to 7 digit number
	var id = Math.floor(Math.random()*3500000000)+3845
	var hash = base.decTo62(id);
	return hash;
};

var short = function(){};

// if it exists, use pre-existing
short.gen = function(URL, callback) {
	var hashedURL = hesher(URL);
	ShortURL.checkExists(hashedURL, function(error, shortenedURLs) {
		if (shortenedURLs.length > 0){
			console.log("THAT HASH EXISTS!!!! RETRYING!!!");
		} if (error) {
			callback(error, null);
		} else {
			if (shortenedURLs.length === 0) {
				var item = new ShortURL({
					URL : URL,
					hash : hashedURL
				});
				item.save(function(error, item) {
					if (error) {
						callback(error, null);
					} else {
						callback(null, item);	
					};
				});
			} else {
				short.gen(URL, callback);
			}
		}
	});
};

short.get = function(hash, callback) {
	ShortURL.findByHash(hash, function(error, URL) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, URL);
		};
	});
};

module.exports = short;

/* EOF */