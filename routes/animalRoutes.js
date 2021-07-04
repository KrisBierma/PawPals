const router = require('express').Router();
const animalModel = require('../controllers/animalsController');

router.get('/getanimals', (req, results) => {
// app.get('/getanimals', (req, results) => {
  animalModel.getAnimals()
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
});

module.exports = router;