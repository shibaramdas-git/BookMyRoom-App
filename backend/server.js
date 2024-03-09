const express = require('express');
const app = express();

const port = process.env.port || 5000;
app.listen(port, () => console.log('Server started on port 5000'));

const dbConfig = require('./database');