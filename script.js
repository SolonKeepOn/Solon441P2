// Name: Your Name
// ID: Your ID
// Mac Address: Your Mac Address
// Ncc Student ID: Your Ncc Student ID
console.log("I am Solon. IP is 172.30.200.89. Mac address is 28-7F-CF-00-E3-D5. Ncc student ID is: 223190715");
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create or connect to a SQLite database file
const db = new sqlite3.Database('books.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the books database.');

   // Create the books table 
  db.run('CREATE TABLE IF NOT EXISTS books (Title715 TEXT, Author715 TEXT, ISBN715 TEXT, Context715 TEXT)', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Table "books" created or already exists.');
    promptForBookInfo();// Start adding book information
  });
});

// Functions to add book information
function promptForBookInfo() {
  rl.question('Enter the book Title715: ', (Title715) => {
    rl.question('Enter the book Author715: ', (Author715) => {
      rl.question('Enter the book ISBN715: ', (ISBN715) => {
        rl.question('Enter the book Context715: ', (Context715) => {
          db.run('INSERT INTO books (Title715, Author715, ISBN715, Context715) VALUES (?, ?, ?, ?)', [Title715, Author715, ISBN715, Context715], (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Book information added to the database.');
            askToContinue();
          });
        });
      });
    });
  });
}

function askToContinue() {
  rl.question('Do you want to add more books? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      promptForBookInfo();
    } else {
      displayAllBooks();
    }
  });
}

// Function to display information about all books
function displayAllBooks() {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log('All books in the database:');
    rows.forEach((row) => {
      console.log(`Title715: ${row.Title715}, Author715: ${row.Author715}, ISBN715: ${row.ISBN715}, Context715: ${row.Context715}`);
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
      rl.close();
    });
  });
}


