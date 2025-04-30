const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add new transaction
router.post("/add", async (req, res) => {
  try {
    const { userId, desc, amount, type } = req.body;
    const newTxn = new Transaction({ userId, desc, amount, type });
    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// Get all transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;