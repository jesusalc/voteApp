// grab the things we need
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// create a schema
const usersSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

// make this available to our users in our Node applications
export default usersSchema;
