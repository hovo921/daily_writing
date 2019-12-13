const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require("moment");

const wordSchema = new Schema({
  text:  {type:String, default: ""},
  owner: String,
  createdAt: String,
  date: Date,
  updated: Date
},)

wordSchema.pre('save', function(next) {
  this.createdAt = moment().format("DD-MM-YY");
  this.date = new Date();
  next();
})
const ModelClass = mongoose.model('word', wordSchema)

module.exports = ModelClass
