'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  _id: String,
  author: String,
  desc: String,
  contributor: String,
  image: String
});

module.exports = mongoose.model('Book', BookSchema);