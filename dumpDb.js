const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'hublotuneti'
});

connection.connect((err) => {
  if (err) { console.error(err); process.exit(1); }
  
  const tables = ['products', 'categories', 'collections', 'product_images', 'users', 'orders'];
  let pending = tables.length;

  tables.forEach(table => {
      connection.query(`SELECT * FROM ${table}`, (err, results) => {
          if (err) console.error(`Error with ${table}:`, err);
          else {
              fs.writeFileSync(`src/data/${table}.json`, JSON.stringify(results, null, 2));
              console.log(`Saved ${results.length} records to ${table}.json`);
          }
          pending--;
          if (pending === 0) connection.end();
      });
  });
});
