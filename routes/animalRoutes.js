const router = require('express').Router();
const animalsModel = require('../controllers/animalsController');

router.get('/getAnimals', (req, results) => {
// app.get('/getanimals', (req, results) => {
  animalsModel.getAnimals()
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});


module.exports = router;