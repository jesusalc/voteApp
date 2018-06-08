'use strict';
import mongoose from 'mongoose'
import processConnection from '../lib/mongoose-processConnection'

import sayingsSchema from '../db/schemas/sayingsSchema'
const Sayings = processConnection('sayings', sayingsSchema)

import usersSchema from '../db/schemas/usersSchema'
const Users = processConnection('users', usersSchema)

import ratingsSchema from '../db/schemas/ratingsSchema'
const Ratings = processConnection('ratings', ratingsSchema)

mongoose.Promise = global.Promise;
let options = {
  //useMongoClient: true, DEPRECATED IN Version 4 of Mongoose
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
const schemas = {
  Mongoose: mongoose,
  Sayings: Sayings,
  Users: Users,
  Ratings: Ratings
}

export default schemas;