const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./middleware/');
const server = express();

// routers
// const _Router = require('./_/_-router');

// Configure your server here
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(logger);

// server.use('/api/_', _Router);

server.use('*', (req, res) => {
	res.status(404).send(`<p>Oops, can't find that!</p>`);
});

//error handling function for all middleware
// eslint-disable-next-line
server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		custom: 'Strange things are afoot at the circle K',
		message: err.message,
		stack: err.stack
	});
});

module.exports = server;
