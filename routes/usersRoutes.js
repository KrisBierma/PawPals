const router = require('express').Router();
const usersModel = require('../controllers/animalsController');

router.get('/getFavs/:id', (req, results) => {
  var id = [req.params.id];
  usersModel.getFavs(id)
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

module.exports = router;