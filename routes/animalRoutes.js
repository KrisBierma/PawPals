const router = require('express').Router();
const animalsController = require('../controllers/animalsController');
const checkAuthentication = require('../config/isAuthenticated');

// addAnimal: 'INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID, availabilityID, updatedByID, dateAdded, dateUpdated, imageURL) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',

// to-do: test this from front end
router.post('/addAnimal/:name/:gender/:desc/:breedID/:typeID/:avID/:updateByID/:imageURL', checkAuthentication, (req, results) => {
  // app.get('/getanimals', (req, results) => {
  var params = [
    req.params.name, req.params.gender, req.params.desc, req.params.breedID, req.params.typeID, req.params.avID, 
    req.params.updateByID, req.params.imageURL
  ];
  animalsController.addAnimal(params)
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addDisposition/:animalID/:dispositionID', checkAuthentication, (req, results) => {
  // app.get('/getanimals', (req, results) => {
  var params = [
    req.params.animalID, req.params.dispositionID
  ];
  animalsController.addDisposition(params)
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getAnimalsWiFavs/:id', (req, results) => {
  animalsController.getAnimalsWiFavs([req.params.id])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getAvailabilities/', (req, results) => {
  animalsController.getAvailabilities()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getBreeds/', (req, results) => {
  animalsController.getBreeds()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getDispositions/', (req, results) => {
  animalsController.getDispositions()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getTypes/', (req, results) => {
  animalsController.getTypes()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});


module.exports = router;