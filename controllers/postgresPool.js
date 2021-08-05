const { Pool, Client } = require('pg');
require('dotenv').config();

// database...
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: function(text, values, cb) {
     pool.connect(function(err, client, done) {
       client.query(text, values, function(err, result) {
         done();
         cb(err, result);
       })
     });
  }
}