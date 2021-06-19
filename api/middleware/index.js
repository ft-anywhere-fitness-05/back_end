function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
	next();
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateAction,
	validateProject
};
