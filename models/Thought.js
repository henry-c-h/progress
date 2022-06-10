const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Thought', ThoughtSchema);
