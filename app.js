'use strict';

require('dotenv').config();
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/', require('./routes/profile')());
app.use('/api', require('./routes/api')());

module.exports = app;
