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
	Homey.log(args);
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
			
			Homey.manager('speech-output').say(__('readarticles_start',{'rsstitle':articles[0].feed.name}));
			articles.forEach(function(a){
				Homey.log(a);
				if(args.whattoread == '1'){
					Homey.manager('speech-output').say(a.title);
				}else if(args.whattoread == '2'){
					Homey.manager('speech-output').say(a.content);
				}else{
					Homey.manager('speech-output').say(a.title);
					Homey.manager('speech-output').say(a.content);
				}			
			});
			c(null,true);
		}
	});
}

module.exports.init = init;