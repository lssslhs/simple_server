module.exports = function() {
	'use strict';

	var service = {
		init: init,
		logError: logError
	};

	return service;

	function init(err, req, res, next) {
		var status = err.statusCode || 500;
		if (err.message) {
			res.send(status, err.message);
		}
		else {
			res.send(status, err);
		}
		next();
	}

	function logError(err, req, res, next) {
		var status = err.statusCode || 500;
		console.error(status + ' ' + (err.message ? err.message : err));
		if (err.stack) {
			console.error(err.stack);
		}
		next(err);
	}
}