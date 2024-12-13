const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json()); 

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pygrl00y8',
  database: 'todos' 
});

// Connect to MySQL
db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Create a new task
app.post('/todos', (req, res) => {
  const { task, isChecked = false } = req.body; 
  const id = Date.now(); 
  const sql = 'INSERT INTO list (id, task, isChecked) VALUES (?, ?, ?)';

  db.query(sql, [id, task, isChecked], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      return res.status(500).json({ error: 'Error adding task' });
    }
    res.status(201).json({ message: 'Task added', id });
  });
});

// Get all tasks
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM list';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.json(result);
  });
});

// Update a task's status
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const {isChecked ,task} = req.body;

  console.log(isChecked,task);

  const sql = 'UPDATE list SET task = ?, isChecked = ? WHERE id = ?';

  db.query(sql, [task, isChecked, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ error: 'Error updating task' });
    }
    res.json({ message: 'Task updated' });
  });
});


// Delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM list WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Error deleting task' });
    }
    res.json({ message: 'Task deleted' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
