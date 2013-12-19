var def = {};

exports.model = function(model, property, type) {
	if(!def[model]) def[model] = {};
	def[model][property] = type;
};

exports.dumpModel = function() {
	console.log(def);
};
