import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const response = await axios.get('http://localhost:3001/api/expenses');
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <ExpenseForm onAdd={fetchExpenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}