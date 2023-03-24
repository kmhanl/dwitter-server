import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

// SQL: DB Schema
// NOSQL: DB Schema X, ORM Schema
const userSchema = new Mongoose.Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, requried: true},
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

userSchema.virtual('id').get(function() {
  return this._id.toString();
});
userSchema.set('toJSON', {virtuals: true});
userSchema.set('toObject', {virtuals: true});

export async function findByUsername(username) {
  return User.findOne({ username });
  // return getUsers().find({ username }).next().then(mapOptionalUser);
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
