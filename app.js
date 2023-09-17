const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Create or connect to the SQLite database
const dbPath = path.join(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Create a 'tasks' table if it doesn't exist
db.run(
  'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)',
  (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created or already exists.');
    }
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', (req, res) => {
  // Fetch tasks from the database
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).send('Bad Request: Task is required.');
    return;
  }

  // Insert the new task into the database
  db.run('INSERT INTO tasks (task) VALUES (?)', [task], (err) => {
    if (err) {
      console.error('Error inserting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Task added successfully');
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  // Delete the task from the database
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

