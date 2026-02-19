const mongoose = require('mongoose');

const FirmSchema = new mongoose.Schema({
  firmname: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true
    // unique removed intentionally
  },
  categories: [{
    type: String,
    enum: ['veg', 'non-veg']
  }],
  region: [{
    type: String,
    enum: ['north-indian', 'south-indian', 'bakery', 'chinese'] // fixed spelling
  }],
  offer: {
    type: String
  },
  image: {
    type: String
  },
  vendor: { // lowercase and single reference
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor', // FIX: must match your Vendor model name
    required: true
  }
});

const Firm = mongoose.model('Firm', FirmSchema);
module.exports = Firm;