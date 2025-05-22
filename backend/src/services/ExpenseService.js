const { getRepository } = require('typeorm');
const Expense = require('../models/Expense');

exports.createExpense = async (expenseData) => {
  const expenseRepo = getRepository(Expense);
  const expense = expenseRepo.create({
    ...expenseData,
    amount: parseFloat(expenseData.amount)
  });
  return await expenseRepo.save(expense);
};

exports.getAllExpenses = async () => {
    const expenseRepo = getRepository(Expense);
    return await expenseRepo.find({ order: {createdAt: 'DESC'}});
};
