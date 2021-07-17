const router = require('express').Router();
const usersModel = require('../controllers/usersController');

router.post('/addFav/:animalid/:userid/', (req, results) => {
  var params = [req.params.animalid, req.params.userid];
  console.log("in routes, id: ",params);
  usersModel.addFav(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

// router.post('/addUser/:roleID/:name/:password/:email', (req, results) => {
//   var params = [req.params.roleID, req.params.name, req.params.password, req.params.email];
//   usersModel.addUser(params)
//     .then(res => results.status(200).send(res))
//     .catch(error => results.status(500).json(error));
// });

router.delete('/deleteFav/:animalid/:userid', (req, results) => {
  var params = [req.params.animalid, req.params.userid];
  console.log("in routes, id: ",params);
  usersModel.deleteFav(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.delete('/deleteUser/:userid', (req, results) => {
  var params = [req.params.userid];
  console.log("in routes, id: ",params);
  usersModel.deleteUser(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.get('/getAllUsernames', (req, results) => {
  usersModel.getAllUsernames()
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.get('/getFavs/:id', (req, results) => {
  usersModel.getFavs([req.params.id])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.put('/updateUserEmail/:userEmail/:userID', (req, results) => {
  usersModel.updateUserEmail([req.params.userEmail, req.params.userID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.put('/updateUserPass/:userPass/:userID', (req, results) => {
  usersModel.updateUserPass([req.params.userPass, req.params.userID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

module.exports = router;