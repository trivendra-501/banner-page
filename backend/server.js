// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Trivendra@123', // Your MySQL password
  database: 'banner_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Get banner details
app.get('/api/banner', (req, res) => {
  const sql = 'SELECT * FROM banner LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Update banner details
app.post('/api/banner', (req, res) => {
  const { description, timer, link } = req.body;
  const sql = 'UPDATE banner SET description = ?, timer = ?, link = ? WHERE id = 1';
  db.query(sql, [description, timer, link], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Banner updated successfully' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
