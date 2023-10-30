import React from 'react';
import './styles.css'; // Ensure you've imported the styles

function BooksList({ books, deleteBook }) {
  return (
    <div className="books-list">
      {books.map(book => (
        <div key={book.id} className="book-item">
          <div className="book-details">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </div>
          <button className="delete-button" onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BooksList;
