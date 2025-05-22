import ExpenseForm from '../components/ExpenseForm';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function AddExpense() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/');
    };

    return (
    <div className="container">
        <h1 className="title">Agregar Gasto</h1>
        <ExpenseForm onAdd={handleSuccess} />
    </div>
    );
}