const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title    : String,
  audio    : String,
  cName    : String,
  category : {
    type : mongoose.Types.ObjectId,
    ref  : 'Category',
  },
});
module.exports = mongoose.model('Audio', audioSchema);
