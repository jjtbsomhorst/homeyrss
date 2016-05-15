"use strict";
var feed = require("feed-read-parser");
function init() {
	
	Homey.log("Hello world!");
	
	Homey.manager('flow').on('action.read_feed',function(callback,args){
		readFeed(callback,args);
	});
}

function readFeed(callback,args){
	Homey.log('Start reading from');
	Homey.log(args.url);
	Homey.log(args.title);
	var args = args;
	var c= callback;
	feed(args.url,function(err,articles){
		Homey.log('Done parsing feed');	
		if(err){
			Homey.log('Error parsing feed');
			Homey.log(err);
			c(err,false);
		}else{
			var articles = articles.slice(0,10);
			Homey.log('Done parsing feed');
			var mgr = Homey.manager('speech-output');
			Homey.manager('speech-output').say(__('readarticles_start',{'rsstitle':args.title}));
			articles.forEach(function(a){
				Homey.manager('speech-output').say(a.title);
			});
			c(null,true);
		}
	});
}

module.exports.init = init;