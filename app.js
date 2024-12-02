const express = require('express');
const connectDB = require('./db.js');

const app = express();

connectDB();

app.use(express.json());

module.exports = app;