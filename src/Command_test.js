var Command = require('./Command.js');

var tree = {
	print: {
		define: [
			{
				name: 'blog_model',
				with:	[ 'title', 'body.text' ],
				owned_by: [ 'a_user' ]
			}
		]
	}
};

Command.run(tree);
