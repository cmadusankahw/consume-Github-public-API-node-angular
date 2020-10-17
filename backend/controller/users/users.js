const User = require('./user.model');

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const users = express();

//middleware
users.use(bodyParser.json());
users.use(bodyParser.urlencoded({ extended: false }));


users.get('/get/all', (req, res, next) => {
  User.find().then ( (users) => {
    res.status(200).json(
      {
        message: "User List recieved Successfully",
        users: users
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      {
        message: "Error occured while retriving user list",
      });
  });
});


module.exports = users;
