const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'android',
  password: '1234',
  database: 'test'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM stiens';
  db.query(query, (err, results) => {
    if (err) {
      console.error('쿼리 에러:', err);
      res.status(500).json({ error: 'DB 쿼리 실패' });
      return;
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
