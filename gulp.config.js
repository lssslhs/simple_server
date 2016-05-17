module.exports = function() {
	var config = {

		//all js to vet
		alljs: [
			'./src/client/**/*.js' //only vet client code(es6 not well support by all plugins)
		]
	};

	return config;
}