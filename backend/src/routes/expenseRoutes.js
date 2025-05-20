const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');

router.post('/', expenseController.addExpense);
router.get('/', expenseController.getExpenses);