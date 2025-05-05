const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/Expense');

// POST: Add new expense
router.post('/add', async (req, res) => {
  try {
    const { userId, desc, amount, type, date } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Try converting to ObjectId safely
    let mongoUserId;
    try {
      mongoUserId = new mongoose.Types.ObjectId(userId);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    const newExpense = new Expense({
      userId: mongoUserId,
      desc,
      amount,
      type,
      date
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully' });

  } catch (err) {
    console.error("Error saving expense:", err);
    res.status(500).json({ error: 'Failed to add expense', detail: err.message });
  }
});// GET: Get all expenses for a user
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// DELETE: Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;