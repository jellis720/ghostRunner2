const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: {type: String, unique: true, required: true},
  body: {type: String, required: true},
  notes: {type: Number},
  tags: [],
  userID: {type: Schema.Types.ObjectId}
});

// create a model for a club
const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
