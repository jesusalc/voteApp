/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
const app = express();

import Sayings from './app/db/schemas/sayingsSchema';
import Users from './app/db/schemas/usersSchema';
import Ratings from './app/db/schemas/ratingsSchema';

import initialSayings from './config/sayings.json';

app.set('port', 5000);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/voteApp');
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

// http.createServer(app).listen(app.get('port'));

http.createServer(app).listen(app.get('port'), 'localhost');
