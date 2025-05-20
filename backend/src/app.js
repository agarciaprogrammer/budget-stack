require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api/expenses', expenseRoutes);

db.then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => console.error('DB connection failed: ', err));