require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
const server = require('./api/server');

// server.use(cors());
// server.use(express.static(path.join(__dirname, 'client/build'))); // static assetss

if (process.env.NODE_ENV === 'production') {
	console.log('this means this code is deployed');
}

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log(`\n*** Server Running on http://localhost:${PORT}***\n`);
});
