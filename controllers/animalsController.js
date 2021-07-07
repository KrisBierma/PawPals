const { Pool, Client } = require('pg');
const results = require('dotenv').config();
const { animalsQ } = require('./queries.js');
const { usersQ } = require('./queries.js');
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
  console.log(animalsQ.getAll);
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if(err) {
        reject(err.stack);
      };
      client.query(animalsQ.getAll, (error, res) => {
        release();
        if(error) {
          reject(error.stack);
        }
        console.log("RES:",res.rows[0]);
        if(res != undefined) {
          // to-do: handle this here or in component?
        }
        resolve(res.rows);
      })
    })
  });
};

const getFavs = (id) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if(err) {
        reject(err.stack);
      };
      client.query(usersQ.getFavs, id, (error, res) => {
        release();
        if(error) {
          reject(error.stack);
        }
        if(res != undefined) resolve(res.rows);
        else reject('no data');
      })
    })


    // pool.query('Select * From animals', (error, res) => {
    //   if(error) {
    //     reject (error);
    //   };
    //   console.log("RES:",res.rows[0]);
    //   if(res != undefined) {
    //     // to-do: handle this here or in component?
    //   }
    //   resolve(res.rows);
    // })
    // pool.end();    // to-do: add this in when connection done
  });
};


module.exports = {
  getAnimals,
  getFavs
};