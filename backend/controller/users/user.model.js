const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema(
  {
    login: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    location: {type:String, required: true},
    avatar_url: {type: String, required: true},
  },
  { collection : 'User' }
);

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', usersSchema );

