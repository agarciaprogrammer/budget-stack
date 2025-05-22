const expenseService = require('../services/ExpenseService');

exports.addExpense = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // ← Verifica qué llega
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error detallado:", error); // ← Más detalles
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