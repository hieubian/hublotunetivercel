const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'hublotuneti',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) { console.error('Failed to connect:', err); process.exit(1); }
  
  const sql = fs.readFileSync('../../hublotuneti.sql', 'utf8');
  console.log('Read SQL file, length:', sql.length);
  
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error executing SQL:', err);
      } else {
          console.log('SQL executed successfully. Re-running dumpDb.js logic...');
          
          connection.query('SELECT * FROM products', (err, rows) => {
              if (err) console.error(err);
              else {
                  fs.writeFileSync('src/data/products.json', JSON.stringify(rows, null, 2));
                  console.log('Updated src/data/products.json with', rows.length, 'records.');
              }
              connection.end();
          });
      }
  });
});
