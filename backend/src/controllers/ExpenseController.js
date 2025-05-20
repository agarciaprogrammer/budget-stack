const expenseService = require('../services/ExpenseService');

exports.addExpense = async (req, res) => {
    try {
        const expense = await expenseService.createExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({error: error.message});
    } 
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({error: 'Error fetching expenses'});
    } 
};