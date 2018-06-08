/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import schemas from './app/middleware/obtain-connections'
import models from './app/models'

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

require('./app/routes')(app, schemas, models);

/**
 * Start Server
 */
const port = app.get('port')
console.info('Go to http://127.0.0.1:' + port + '/initializeSayings to load initial Sayings' );
console.info('' );
console.info('Listening on http://127.0.0.1:' + port);
console.info('' );
http.createServer(app).listen(port);

//http.createServer(app).listen(app.get('port'), 'localhost');
