const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');

router.post('/', expenseController.addExpense);
router.get('/', expenseController.getExpenses);
//router.get('/', expenseController.getTotal);
router.put('/:id', expenseController.updateExpense);
router.delete('/delete', expenseController.deleteExpense);

module.exports = router;