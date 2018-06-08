/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import mongoose from './app/middleware/obtain-connections'
const app = express()


app.set('port', 3000);

const allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCors);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/app/build')));

const { findUserByName, findRatingsofUser } = require('./app/models');

require('./app/routes')(app);

/**
 * Start Server
 */
const port = app.get('port')
console.info('Listening on http://localhost:' + port);
http.createServer(app).listen(port);

//http.createServer(app).listen(app.get('port'), 'localhost');
