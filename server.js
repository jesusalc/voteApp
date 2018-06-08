/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

import express from 'express'
import mongoose from 'mongoose'
import processConnection from './app/lib/mongoose-processConnection'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
const app = express()

import sayingsSchema from './app/db/schemas/sayingsSchema'
const Sayings = processConnection('sayings', sayingsSchema)

import usersSchema from './app/db/schemas/usersSchema'
const Users = processConnection('users', usersSchema)

import ratingsSchema from './app/db/schemas/ratingsSchema'
const Ratings = processConnection('ratings', ratingsSchema)

import initialSayings from './config/sayings.json';

app.set('port', 3000);

mongoose.Promise = global.Promise;
let options = {
  //useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(process.env.MONGO_URL, options);
// mongoose.connect('mongodb://localhost/voteApp');
/**
 * Anything in public can be accessed statically without
 * this express router getting involved
 */

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

const findUserByName = (name) => {
   return new Promise((resolve, reject) => {
       resolve(Users.findOne({ name : name }, '_id name', (err, user) => {
           return user;
       }))
   });
};

const findRatingsofUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(
            Ratings.find({}).select('-_id saying').where('user').equals(userId).exec((err, ratings) => {
                return ratings;
            })
        )
    })
};


app.get('/sayings/:user', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/build/index.html'));
});

/**
 * Always serve the same HTML file for all requests
 */

app.get('/initializeSayings', function(req, res) {
    Sayings.insertMany(initialSayings.sayings, (err, document) => {
        res.send(err)
    });
});

app.get('/api/user', function (req, res) {
    findUserByName(req.query.name)
        .then(foundUser => {
            return foundUser
        }).then(user => {
            if (user === null) {
                const user = new Users({
                    name: req.query.name
                });
                return user.save().then(savedUser => {
                    return savedUser;
                })
            }
            return user;
    }).then(user => {
        res.send(user);
    });
});

app.get('/api/sayings', function (req, res, next) {
    findRatingsofUser(req.query.userId)
        .then((sayings) => {
            const sayingIds = sayings.map((saying) => {
                return saying.saying;
            });
            Sayings.find({})
            .where('_id').nin(sayingIds)
                .limit(25)
                .exec(function (err, sayings) {

                    res.json({sayings, totalVoted: sayingIds.length});
                    res.end();
                });
        });

});

app.post('/api/rateSaying', function (req,res) {
    const rating = new Ratings({
        rate: req.body.rate,
        user: req.body.user,
        saying: req.body.sayingId
    });
    rating.save();
    res.end();
});

/**
 * Start Server
 */
const port = app.get('port')
console.info('Listening on http://localhost:' + port);
http.createServer(app).listen(port);

//http.createServer(app).listen(app.get('port'), 'localhost');
