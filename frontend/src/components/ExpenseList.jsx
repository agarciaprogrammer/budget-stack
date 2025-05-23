import '../styles/components/ExpenseList.css';
import '../styles/global.css';

export default function ExpenseList({ expenses, selectedExpenses, onSelect, onEdit, onDelete }) {
  return (
    <div className="expense-list">
      <div className='list-header'>
        <h2 className="list-title">Tus Gastos</h2>
        <div className='list-actions'>
          <button onClick={onEdit} className='btn-edit' >Editar</button>
          <button onClick={onDelete} className='btn-delete' >Eliminar</button>
        </div>
      </div>
        <ul className="expense-items">
          {expenses.map(expense => (
            <li key={expense.id} className={`expense-item ${selectedExpenses.includes(expense.id) ? 'selected' : ''}`} onClick={() => onSelect(expense.id)} >
              <p className="expense-description">{expense.description}</p>
              <p className="expense-amount">
                {typeof expense.amount === 'number'
                  ? `$${expense.amount.toFixed(2)}`
                  : `$${parseFloat(expense.amount).toFixed(2)}`
                }
              </p>
              <p className="expense-date">
                {new Date(expense.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>  
    </div>
  );
}