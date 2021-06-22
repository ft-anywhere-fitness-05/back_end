const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger, restricted } = require('./middleware/index');
const server = express();

// routers
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const classRouter = require('./classes/class-router');
const typeRouter = require('./types/type-router');
const userClassRouter = require('./user-classes/user-class-router');

// Configure your server here
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(logger);

server.use('/api/auth/', authRouter);
server.use('/api/classes/', classRouter);
server.use('/api/users/', restricted, userRouter);
server.use('/api/types/', typeRouter);
server.use('/api/user-classes/', restricted, userClassRouter);

server.use('*', (req, res) => {
	res.send(
		`<h1><a href='https://github.com/ft-anywhere-fitness-05/back_end/blob/main/README.md'>README</a> for the Anywhere Fitness API</h1>`
	);
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
