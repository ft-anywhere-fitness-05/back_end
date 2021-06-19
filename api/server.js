const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./middleware/index');
const server = express();

// routers
const authRouter = require('./auth/auth-router');

// Configure your server here
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(logger);

server.use('/api/auth/auth-router', authRouter);

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
