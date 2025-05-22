import { useState, useEffect  } from 'react';
import axios from 'axios';
import '../styles/global.css';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import TotalExpenses from '../components/TotalExpenses';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Home.jsx
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/expenses', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!Array.isArray(response.data)) {
        throw new Error('La respuesta no es un array');
      }
      
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddSuccess = () => {
    fetchExpenses();
    setShowForm(false);
  };

  console.log('Type of expenses:', typeof expenses, Array.isArray(expenses));

  return (
    <div className="container">
      <h1 className="title">Budget Tracker</h1>
      <AnimatePresence>
        {showForm ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ExpenseForm 
              onAdd={handleAddSuccess} 
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn"
            onClick={() => setShowForm(true)}
          >
            + Agregar Gasto
          </motion.button>
        )}
      </AnimatePresence>
      <TotalExpenses expenses={expenses || []} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}