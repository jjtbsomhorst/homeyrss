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
        this.speechoutput = Homey.manager('speech-output');
        this.flowManager = Homey.manager('flow');
        this.flowManager.on(ACTION_READ_FEED,this.onReadRssFeed.bind(this));
    }

    onReadRssFeed(cb,args){
        var parser = new FeedMe(true);
        
        parser.on('end',this.onFeedParsed.bind(this,cb,args,parser));
       http.get(args.url,function(res){
           res.pipe(parser);
       }.bind(this));
    }

    onFeedParsed(cb,args,parser){
        Homey.log(cb);
        Homey.log(args);
        try{
            var feedContent = parser.done();
            var items = feedContent.items;

            if(items.length > args.articlecount){
            items = items.slice(0,args.articlecount);
            }

            var itemlenght = items.length;

            for(var i = 0; i < itemlenght;i++){
            var item = items[i];

            this.readEntry(null,item,i,cb,args);

            }

            cb(null,true);
            
        }catch(err){
            Homey.log('error');
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
        item = null;
    }
}

 module.exports = flowProcessor