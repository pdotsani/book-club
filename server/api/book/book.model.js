'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({ 
  name: {type: String, required: true},
  author: {type: String, required: true},
  contributor: {type: mongoose.Schema.Types.ObjectId, reuired: true},
  image: {type: String, required: true}
});

module.exports = mongoose.model('Book', BookSchema);