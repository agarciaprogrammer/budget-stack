const expenseService = require('../services/ExpenseService');

exports.addExpense = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(400).json({error: error.message});
  } 
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses || []); // ← Falla segura
  } catch (error) {
    res.status(500).json([]); // ← Retorna array vacío en errores
  }
};

exports.getTotal = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    res.json( {total: total.toFixed(2)} );
  } catch (error) {
    res.status(500).json({error: 'Error calculating total'});
  }
};