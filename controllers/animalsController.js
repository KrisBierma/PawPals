const { Pool, Client } = require('pg');
const results = require('dotenv').config();
// if(results.error) console.log(results.error)
// else console.log(results.parsed);

// postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
// const pgConfig = { 
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   pgPort: process.env.PG_PORT
// }

// let conn = `postgres://${pgConfig.user}:${pgConfig.host}@${pgConfig.database}:${pgConfig.pgPort}/${pgConfig.password}`;

// database...
// run cat .env in git bash to get postgres config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString: conn,
  ssl: {
    rejectUnauthorized: false
  }
});

// queries...
const getAnimals = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * From animals', (error, res) => {
      if(error) {
        reject (error);
      };
      console.log("RES:",res.rows[0]);
      if(res != undefined) {
        // to-do: handle this here or in component?
      }
      resolve(res.rows);
    })
    // pool.end();    // to-do: add this in when connection done
  });
};

module.exports = {
  getAnimals
};