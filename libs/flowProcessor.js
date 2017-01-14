"use strict"

var FeedMe = require('feedme');
var http = require('http');

const ACTION_READ_FEED = 'action.read_feed';
class flowProcessor{

    constructor(){
        this.init();
    }

    init(){
        Homey.log('Flowprocessor init');

        this.parser = new FeedMe(true);
        this.speechoutput = Homey.manager('speech-output');
        this.flowManager = Homey.manager('flow');
        this.flowManager.on(ACTION_READ_FEED,this.onReadRssFeed.bind(this));

        
        
    }

    onReadRssFeed(cb,args){
        this.parser.on('end',this.onFeedParsed.bind(this,cb,args));
       http.get(args.url,function(res){
           res.pipe(this.parser);
       }.bind(this));
    }

    onFeedParsed(cb,args){
        Homey.log(cb);
        Homey.log(args);
        var feedContent = this.parser.done();
        var items = feedContent.items;

        if(items.length > args.articlecount){
            items = items.slice(0,args.articlecount);
        }

        console.log(items.length);
        for(var i = 0; i < items.length;i++){
            this.readEntry(items,items[i],i, cb,args);
        }
    }

    readEntry(collection, item, index, callback, args){
        switch(parseInt(args.whattoread)){
                case 1:
                    this.speechoutput.say(item.title);
                    break;
                case 2: 
                    this.speechoutput.say(item.description);
                default:
                    this.speechoutput.say(item.title);
                    this.speechoutput.say(item.description);
                    break;
        }
        if(collection.length == index){
            cb(null,true);
        }
    }
}

 module.exports = flowProcessor