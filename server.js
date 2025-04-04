const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json());

// SQLite DB
const dbPath = path.join(__dirname, 'emails.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)");
});

app.post('/submit-email', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email' });
  }

  const stmt = db.prepare("INSERT OR IGNORE INTO emails (email) VALUES (?)");
  stmt.run(email, function (err) {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
