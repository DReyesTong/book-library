const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, description TEXT)");
});

module.exports = db;
