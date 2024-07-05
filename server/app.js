const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Get all customers
app.get('/api/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single customer
app.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM customers WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Transfer money
app.post('/api/transfer', (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  // Check balance
  db.query('SELECT current_balance FROM customers WHERE id = ?', [senderId], (err, results) => {
    if (err) throw err;
    if (results[0].current_balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balances
    db.query('UPDATE customers SET current_balance = current_balance - ? WHERE id = ?', [amount, senderId], err => {
      if (err) throw err;
      db.query('UPDATE customers SET current_balance = current_balance + ? WHERE id = ?', [amount, receiverId], err => {
        if (err) throw err;
        
        // Record transfer
        db.query('INSERT INTO transfers (sender_id, receiver_id, amount) VALUES (?, ?, ?)', [senderId, receiverId, amount], err => {
          if (err) throw err;
          res.json({ message: 'Transfer successful' });
        });
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
