import { useState, useEffect  } from 'react';
import axios from 'axios';
import '../styles/global.css';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import EditExpenseForm from '../components/EditExpenseForm';
import TotalExpenses from '../components/TotalExpenses';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

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

  useEffect(() => { fetchExpenses(); }, []);

  const handleSelectExpense = (id) => {
    setSelectedExpenses(prev => 
      prev.includes(id) 
        ? prev.filter(expenseId => expenseId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (!selectedExpenses.length) return;
    
    const confirm = window.confirm(`¿Eliminar ${selectedExpenses.length} gasto(s)?`);
    if (!confirm) return;

    try {
      await axios.delete('/api/expenses/delete', { data: { ids: selectedExpenses } });
      await fetchExpenses();
      setSelectedExpenses([]);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = () => {
    if (selectedExpenses.length !== 1) {
      alert('Selecciona solo 1 gasto para editar');
      return;
    }
    
    const expenseToEdit = expenses.find(e => e.id === selectedExpenses[0]);
    setEditingExpense(expenseToEdit);
    setShowForm(true); // Mostrar el formulario al editar
  };

  const handleFormSubmit = async () => {
    await fetchExpenses();
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="container">
      <h1 className="title">Budget Tracker</h1>
      
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ExpenseForm 
              expenseToEdit={editingExpense}
              onAdd={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingExpense(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showForm && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="btn"
          onClick={() => setShowForm(true)}
        >
          + Agregar Gasto
        </motion.button>
      )}

      <TotalExpenses expenses={expenses} />
      
      <ExpenseList 
        expenses={expenses} 
        selectedExpenses={selectedExpenses}
        onSelect={handleSelectExpense}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}