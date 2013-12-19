var Appdef = require('./Appdef.js');
var _ = require('lodash');

var commands = {
	define: function() {
//		console.log("Defining: ", arguments[0]);
		var _args = arguments[0][0];
		var affected = 0;
		_.forEach(_args.with, function(argument) {
//			console.log("Adding to model: "+argument);
			var property = argument, type = 'text';
			if(argument.indexOf('.') > 0) {
				var _p = argument.split('.');
				property = _p[0];
				type = _p[1];
			}
			Appdef.model(_args.name, property, type);
			affected++;
		});
		Appdef.dumpModel();
		return affected;
	}
};

//TODO: make this a tail-recursive stack thing, so we can do print(define(modelstuff), define(guistuff))
var sm = {
	fn: '',
	params: [],
	result: {},
	run: function() {
//		console.log("Calling: "+sm.fn);
		sm.result = commands[sm.fn](sm.params);
//		console.log("sm.result = ", sm.result);
	}
};

var _run = function(node) {
//	console.log("_run: ", node);
	if(node instanceof Array) {
		sm.params = node;
		sm.run();
	} else if(node instanceof Object) {
		for(var k in node) {
//			console.log("FN = "+k);
			sm.fn = k;
			_run(node[k]);
		}
	}
};

exports.run = function(tree) {
	_run(tree);
};