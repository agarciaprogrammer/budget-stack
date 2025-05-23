import { useState  } from 'react';

export default function EditExpenseForm({ expense, onSave, onCancel }) {
  const [formData, /* setFormData */] = useState(expense);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos editables */}
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}