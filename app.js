"use strict";
const flowProcessor = require('./libs/flowProcessor.js');

class App{
	constructor(){
		Homey.log('Initialize app');
		this.init = this._onExportsInit.bind(this);
	}

	_onExportsInit(){
		this.flow = new flowProcessor();
	}
}

module.exports = new App();