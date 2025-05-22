// import { useEffect, useState } from "react";
// import axios from "axios";
import '../styles/global.css';

export default function TotalExpenses({ expenses = [] }) {
  if (!Array.isArray(expenses)) return null;
  
  const total = expenses.reduce((sum, exp) => {
    const amount = Number(exp?.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="total-container">
      <h3>Total Gastado</h3>
      <p className="total-amount">${total.toFixed(2)}</p>
    </div>
  );
}