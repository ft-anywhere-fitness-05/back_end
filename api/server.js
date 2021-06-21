const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { logger } = require('./middleware/index');
const server = express();
const { restricted } = require('./middleware/index');

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
// server.use('/api/users/', restricted, userRouter); // to be used instead of below when all is working
server.use('/api/users/', userRouter);
server.use('/api/types/', typeRouter);
server.use('/api/user-classes/', userClassRouter);

server.use('*', (req, res) => {
	res.send(
		`<h1><a href='https://fitnessapplambda5.herokuapp.com'>README</a> for the anywhere fitness API</h1>`
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
