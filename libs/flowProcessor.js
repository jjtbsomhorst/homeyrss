"use strict"

var FeedMe = require('feedme');
var http = require('http');
var https = require('https');

const ACTION_READ_FEED = 'action.read_feed';
const ACTION_READ_ITEM = 'action.read_specific_item';
class flowProcessor{

    constructor(){
        this.init();
    }

    init(){
        Homey.log('Flowprocessor init');
        this.speechoutput = Homey.manager('speech-output');
        this.flowManager = Homey.manager('flow');
        this.flowManager.on(ACTION_READ_FEED,this.onReadRssFeed.bind(this));
        this.flowManager.on(ACTION_READ_ITEM,this.onReadRssItem.bind(this));
    }

    onReadRssItem(cb,args){
        var parser = new FeedMe(true);
        
        parser.on('end',this.onFeedParsed.bind(this,cb,parser,args.whattoread,args.articlenumber,args.articlenumber+1));

        if(args.hasOwnProperty('url') && args.url != ""){
            var urlLwr = args.url.toLowerCase();
            if(urlLwr.indexOf('http://') == 0){
             http.get(args.url,function(res){
                res.pipe(parser);
             }.bind(this));

            }else if(urlLwr.indexOf('https://') == 0){
              https.get(args.url,function(res){
                res.pipe(parser);
             }.bind(this));
            }
        }
    }

    onReadRssFeed(cb,args){
        var parser = new FeedMe(true);
        
        parser.on('end',this.onFeedParsed.bind(this,cb,parser,args.whattoread,0,args.articlecount));

        if(args.hasOwnProperty('url') && args.url != ""){
            var urlLwr = args.url.toLowerCase();
            if(urlLwr.indexOf('http://') == 0){
             http.get(args.url,function(res){
                res.pipe(parser);
             }.bind(this));

            }else if(urlLwr.indexOf('https://') == 0){
              https.get(args.url,function(res){
                res.pipe(parser);
             }.bind(this));
            }
        }

        /*
       http.get(args.url,function(res){
           res.pipe(parser);
       }.bind(this));
       */
    }

    onFeedParsed(cb,parser,whattoread,startIndex,endIndex){

        try{
            var feedContent = parser.done();
            var items = feedContent.items;
            if(startIndex > items.length-1){
               startIndex = items.length-1;
            }

            if(endIndex > items.length-1){
                endIndex = items.length-1;
            }

            if(startIndex != endIndex){
                items = items.slice(startIndex,endIndex);
            }else{
                items =items.slice(startIndex);
            }


            
            console.log(items);
            for(var i = 0; i < items.length;i++){
                this.readEntry(null,items[i],i,cb,whattoread);
            }

            cb(null,true);
            
        }catch(err){
            Homey.log('error');
        }
        
    }

    readEntry(collection, item, index, callback, whattoread){
        switch(parseInt(whattoread)){
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