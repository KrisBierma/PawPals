const { newsQ } = require('./queries.js');
const  db = require('./postgresPool');

const addNewsAnimal = (vars) => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsAnimal, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addNewsEvent = (vars) => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsEvent, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addNewsNews = (vars) => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsNews, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const deleteNews = (vars) => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.deleteNews, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getNews = () => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.getNews, [], (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

module.exports = {
  addNewsAnimal,
  addNewsEvent,
  addNewsNews,
  deleteNews,
  getNews
};