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

exports.deleteExpenses = async (expenseId) => {
  const expenseRepo = getRepository(Expense);
  await expenseRepo.delete(expenseId);
  return { success: true, count: expenseId.length };
};

exports.updateExpense = async (id, updateData) => {
  const expenseRepo = getRepository(Expense);
  
  if (!id || !updateData || !updateData.description || !updateData.amount) {
    throw new Error('Datos incompletos para actualización');
  }

  if (typeof updateData.amount === 'string') {
    updateData.amount = parseFloat(updateData.amount);
  }

  await expenseRepo.update(id, updateData);
  const updatedExpense = await expenseRepo.findOne({ where: { id } });
  
  if (!updatedExpense) {
    throw new Error('Gasto no encontrado después de actualización');
  }
  
  return updatedExpense;
};