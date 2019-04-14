const express = require('express');
const routes = require('./src/Routes/index');
const app = express();
const bodyParser = require('body-parser');
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.listen(port);