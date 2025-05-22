import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/global.css';
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
    <div className="container">
      <h1 className="title">Budget Tracker</h1>
      <ExpenseForm onAdd={fetchExpenses} />
      <ExpenseList expenses={expenses} />
      <Link to="/add-expense" className="btn">
        Agregar Gasto
      </Link>
    </div>
  ); 
}