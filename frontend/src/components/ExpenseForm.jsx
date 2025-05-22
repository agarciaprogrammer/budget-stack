import { useState } from "react";
import axios from 'axios';
import '../styles/components/ExpenseForm.css';
import '../styles/global.css';

export default function ExpenseForm({onAdd}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/expenses', {
                description,
                amount: parseFloat(amount) // ✅ Corregido aquí
            });
            onAdd(response.data);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error('Error adding expense: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Cambié onChangeCapture a onChange
                required
                className="form-input"
            />
            <input
                type="number"
                placeholder="Gasto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Cambié onChangeCapture a onChange
                step="0.01"
                required
                className="form-input"
            />
            <button type="submit" className="btn">
                Agregar Gasto
            </button>
        </form>
    );
}