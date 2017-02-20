// grab the things we need
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// create a schema
const ratingsSchema = new Schema({
    saying: {
        type: Schema.ObjectId,
        ref: 'sayings'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    rate: { type: Number, required: true, unique: false }
});

// the schema is useless so far
// we need to create a model using it
const Ratings = mongoose.model('ratings', ratingsSchema);

// make this available to our users in our Node applications
export default Ratings;
