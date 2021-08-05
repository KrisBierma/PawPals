const { usersQ } = require('./queries.js');
const  db = require('./postgresPool');

const addFav = (ids) => {
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

const deleteUser = (params) => {
  return new Promise((resolve, reject) => {
    db.query(usersQ.deleteUser, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getAllUsernames = () => {
  return new Promise((resolve, reject) => {
    db.query(usersQ.getAllUserNames, [], (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getFavs = (id) => {
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

const updateUserEmail = (params) => {
  return new Promise((resolve, reject) => {
    db.query(usersQ.updateUserEmail, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const updateUserPass = (params) => {
  return new Promise((resolve, reject) => {
    db.query(usersQ.updateUserPass, params, (error, res) => {
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
  deleteUser,
  getAllUsernames,
  getFavs,
  updateUserEmail,
  updateUserPass
};