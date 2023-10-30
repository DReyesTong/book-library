import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BooksList from './BooksList';
import './styles.css';


function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:5000/books');
    setBooks(response.data);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="container">
      <h1>Personal Book Library</h1>
      <BookForm refreshBooks={fetchBooks} />
      <BooksList books={books} deleteBook={deleteBook} />
    </div>
);

}

export default App;
