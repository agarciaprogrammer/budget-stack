import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import './styles/global.css';

export default function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/add-expense" element={ <AddExpense /> } />
                </Routes>
            </div>
        </Router>
    );
}