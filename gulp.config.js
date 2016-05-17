module.exports = function() {
	var client = './src/client/',
		temp = './.tmp/';

	var config = {

		/*
		 *	All File Path
		 */

		temp: temp,

		//all js to vet
		alljs: [
			client + '**/*.js' //only vet client code(es6 not well support by all plugins)
		],

		//sass
		sass: [
			client + 'styles/*.scss'
		]
	};

	return config;
}