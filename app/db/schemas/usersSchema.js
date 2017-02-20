// grab the things we need
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// create a schema
const usersSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

// the schema is useless so far
// we need to create a model using it
const Users = mongoose.model('users', usersSchema);

// make this available to our users in our Node applications
export default Users;
