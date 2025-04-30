const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String ,enum:['expense','income'], required:true},
  date: { type: Date, required: true}},{timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);