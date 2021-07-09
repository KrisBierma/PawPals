const { usersQ } = require('./queries.js');
const  db = require('./postgresPool');

const addFav = (ids) => {
  console.log("in addfavs, id: ",ids);
  return new Promise((resolve, reject) => {
    db.query(usersQ.addFav, ids, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const deleteFav = (ids) => {
  console.log("in deletefavs, id: ",ids);
  return new Promise((resolve, reject) => {
    db.query(usersQ.deleteFav, ids, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getFavs = (id) => {
  console.log("in getfavs, id: ",id);
  return new Promise((resolve, reject) => {
    db.query(usersQ.getFavs, id, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

module.exports = {
  addFav,
  deleteFav,
  getFavs
};