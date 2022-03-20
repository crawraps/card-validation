const { Schema, model } = require('mongoose')

const schema = new Schema({
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
})

module.exports = model('model', schema)
