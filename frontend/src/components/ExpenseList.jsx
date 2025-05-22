import '../styles/components/ExpenseList.css';
import '../styles/global.css';

export default function ExpenseList({ expenses }) {
  return (
    <div className="expense-list">
      <h2 className="list-title">Tus Gastos</h2>
      <ul className="expense-items">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
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