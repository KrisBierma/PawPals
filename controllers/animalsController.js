const { animalsQ } = require('./queries.js');
const db = require('./postgresPool');

const addAnimal = (params) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAll, params, (error, res) => {
      if(error) reject(error.stack);
      resolve(res.rows);
    })
  })
};

// const getAnimals = () => {
//   return new Promise((resolve, reject) => {
//     db.query(animalsQ.getAll, [], (error, res) => {
//       if(error) reject(error.stack);
//       resolve(res.rows);
//     })
//   })
// };

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

const getAvailabilities = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAvailabilities, [], (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) {
        resolve(res.rows);
      }
      else {
        reject('no data')
      };
    })
  })  
}

const getBreeds = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getBreeds, [], (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) {
        resolve(res.rows);
      }
      else {
        reject('no data')
      };
    })
  })  
}

module.exports = {
  addAnimal,
  getAnimals,
  getAnimalsWiFavs,
  getAvailabilities,
  getBreeds
};