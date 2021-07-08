const router = require('express').Router();
const usersModel = require('../controllers/usersController');

router.get('/getFavs/:id', (req, results) => {
  var id = [req.params.id];
  usersModel.getFavs(id)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.post('/favoriteAnimal/:animalid/:userid/', (req, results) => {
  var ids = [req.params.animalid, req.params.userid];
  console.log("in routes, id: ",ids);
  usersModel.addFav(ids)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.delete('/unfavoriteAnimal/:animalid/:userid', (req, results) => {
  var ids = [req.params.animalid, req.params.userid];
  console.log("in routes, id: ",ids);
  usersModel.deleteFav(ids)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});


module.exports = router;