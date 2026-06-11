const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'hublotuneti'
});

connection.connect();
connection.query('SHOW TABLES', (err, results) => {
    if(err) { console.log(err); process.exit(1); }
    console.log(results);
    process.exit(0);
});
