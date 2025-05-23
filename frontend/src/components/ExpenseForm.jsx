import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/components/ExpenseForm.css';
import '../styles/global.css';

export default function ExpenseForm({ onAdd, onCancel, expenseToEdit }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (expenseToEdit) {
            setDescription(expenseToEdit.description);
            setAmount(expenseToEdit.amount.toString());
            setCreatedAt(expenseToEdit.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0]);
        } else {
            setDescription('');
            setAmount('');
            setCreatedAt(new Date().toISOString().split('T')[0]);
        }
    }, [expenseToEdit]);

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const expenseData = {
      description,
      amount: parseFloat(amount),
      createdAt: createdAt || new Date().toISOString().split('T')[0]
    };

    if (expenseToEdit) {
      const response = await axios.put(
        `http://localhost:3001/api/expenses/${expenseToEdit.id}`,
        expenseData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      onAdd(response.data);
    } else {
      const response = await axios.post(
        'http://localhost:3001/api/expenses',
        expenseData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      onAdd(response.data);
      setDescription('');
      setAmount('');
      setCreatedAt(new Date().toISOString().split('T')[0]);
    }
  } catch (error) {
    console.error('Error saving expense:', {
      error: error.response?.data || error.message,
      request: {
        url: error.config?.url,
        data: error.config?.data
      }
    });
    alert(`Error: ${error.response?.data?.error || error.message}`);
  }
};

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input 
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="number"
                placeholder="Monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                required
                className="form-input"
            />
            <input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                required
                className="form-input"
            />
            <div className="form-actions">
                <button type="submit" className="btn">
                    {expenseToEdit ? 'Actualizar Gasto' : 'Agregar Gasto'}
                </button>
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="btn-cancel"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}