const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create a new book
app.post('/books', (req, res) => {
  const { title, author, description } = req.body;
  db.run("INSERT INTO books (title, author, description) VALUES (?, ?, ?)", [title, author, description], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Get a list of all books
app.get('/books', (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Update a book's details
app.put('/books/:id', (req, res) => {
  const { title, author, description } = req.body;
  db.run("UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?", [title, author, description, req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
