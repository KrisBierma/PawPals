const router = require('express').Router();
const checkAuthentication = require('../config/isAuthenticated');
const usersController = require('../controllers/usersController');

router.post('/addFav/:animalid/:userid/', checkAuthentication, (req, results) => {
  var params = [req.params.animalid, req.params.userid];
  usersController.addFav(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.delete('/deleteFav/:animalid/:userid', checkAuthentication, (req, results) => {
  var params = [req.params.animalid, req.params.userid];
  usersController.deleteFav(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.delete('/deleteUser/:userid', (req, results) => {
  var params = [req.params.userid];
  usersController.deleteUser(params)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.get('/getAllUsernames', (req, results) => {
  usersController.getAllUsernames()
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.get('/getFavs/:id', checkAuthentication, (req, results) => {
  usersController.getFavs([req.params.id])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.put('/updateUserEmail/:userEmail/:userID', checkAuthentication, (req, results) => {
  usersController.updateUserEmail([req.params.userEmail, req.params.userID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.put('/updateUserPass/:userPass/:userID', checkAuthentication, (req, results) => {
  usersController.updateUserPass([req.params.userPass, req.params.userID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

module.exports = router;