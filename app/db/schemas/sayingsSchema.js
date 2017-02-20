// grab the things we need
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create a schema
const sayingsSchema = new Schema({
    saying: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
const Sayings = mongoose.model('sayings', sayingsSchema);

// make this available to our users in our Node applications
export default Sayings;
