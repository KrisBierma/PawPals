const { animalsQ } = require('./queries.js');
const db = require('./postgresPool');

const addAnimal = (params) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.addAnimal, params, (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addDisposition = (params) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.addDisposition, params, (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getAnimalsWiFavs = (id) => {
  console.log(id);
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

const getDispositions = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getDispositions, [], (error, res) => {
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

const getTypes = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getTypes, [], (error, res) => {
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
  addDisposition,
  getAnimalsWiFavs,
  getAvailabilities,
  getBreeds,
  getDispositions,
  getTypes
};