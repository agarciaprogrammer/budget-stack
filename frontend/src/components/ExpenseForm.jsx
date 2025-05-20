import { useState } from "react";
import axios from 'axios';

export default function ExpenseForm({onAdd}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/expenses', {
                description,
                amount: parseFloat(setAmount)
            });
            onAdd(response.data);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error('Error adding expense: ', error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChangeCapture={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Gasto"
                value={amount}
                onChangeCapture={(e) => setAmount(e.target.value)}
                step="0.01"
                required
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Agregar Gasto
            </button>
        </form>
    );
}