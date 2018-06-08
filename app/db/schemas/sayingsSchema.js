// grab the things we need
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create a schema
const sayingsSchema = new Schema({
    saying: { type: String, required: true }
});


// make this available to our users in our Node applications
export default sayingsSchema;
