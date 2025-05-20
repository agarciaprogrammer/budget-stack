export default function ExpenseList({ expenses }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Tus Gastos</h2>
      <ul className="divide-y">
        {expenses.map(expense => (
          <li key={expense.id} className="py-2">
            <p>{expense.description}</p>
            <p className="font-bold">${expense.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {new Date(expense.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}