const { animalsQ } = require('./queries.js');
const db = require('./postgresPool');

const getAnimals = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAll, [], (error, res) => {
      if(error) reject(error.stack);
      resolve(res.rows);
    })
  })
};

const getAnimalsWiFavs = (id) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAllWiFav, id, (error, res) => {
      if(error) reject(error.stack);
      // resolve(res.rows);
      if(res != undefined) {
        resolve(res.rows);
      }
      else {
        reject('no data')
      };
    })
  })
};

module.exports = {
  getAnimals,
  getAnimalsWiFavs
};