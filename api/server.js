const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();

// require routers: ex. below
// const _Router = require('./_/_-router');

// Configure your server here
server.use(express.json());

server.use(logger);

// Build routers ex. below ~ /api/actions/actions-router.js
server.use('/api/actions', actionsRouter);

// Do NOT `server.listen()` inside this file!

server.use('*', (req, res) => {
	res.status(404).send(`
<p>Oops, can't find that!</p>
`);
});

//error handling function for all middleware
// eslint-disable-next-line
server.use((err, req, res, next) => {
	console.log('err handling middleware kicking in!', err.message);
	res.status(err.status || 500).json({
		custom: 'something exploded inside the app',
		message: err.message,
		stack: err.stack
	});
});

module.exports = server;
