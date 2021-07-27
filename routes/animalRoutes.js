const router = require('express').Router();
const animalsController = require('../controllers/animalsController');
const checkAuthentication = require('../config/isAuthenticated');

router.post('/addAnimal', checkAuthentication, (req, results) => {
  var params = [
    req.body.name, req.body.gender, req.body.desc, req.body.breedID, req.body.typeID, req.body.avID, 
    req.body.updateByID, req.body.imageURL
  ];
  animalsController.addAnimal(params)
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/updateAnimal', checkAuthentication, (req, results) => {
  var params = [
    req.body.name, req.body.gender, req.body.desc, req.body.breedID, req.body.typeID, req.body.avID, 
    req.body.updateByID, req.body.imageURL, req.body.animalid
  ];
  animalsController.updateAnimal(params)
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addDisposition/:animalID/:dispositionID', checkAuthentication, (req, results) => {
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

router.post('/deleteDispositions/:animalID', checkAuthentication, (req, results) => {
  var params = [
    req.params.animalID
  ];
  animalsController.deleteDispositions(params)
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.put('/updateAvailability/:availability/:animalID', checkAuthentication, (req, results) => {
  animalsController.updateAvailability([req.params.availability, req.params.animalID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

router.get('/getAnimal/:userid/:animalid', (req, results) => {
  animalsController.getAnimal([req.params.userid, req.params.animalid])
  .then(res => {
    results.status(200).send(res)
  })
  .catch(error => {
    results.status(500).json(error)
  });
});  

router.get('/getAnimalsWiAllFilter/', (req, results) => {
  const { userID, atype, gender, breed } = req.query;
  animalsController.getAnimalsWiAllFilter({
    userID,
    atype,
    gender,
    breed,
  })
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
})

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

router.get("/getBreeds/", (req, results) => {
  animalsController.getBreeds()
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
});

router.get("/getBreedsWithID/:atype", (req, results) => {
  animalsController.getBreeds([req.params.atype])
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
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

router.put('/updateAvailability/:availability/:animalID', checkAuthentication, (req, results) => {
  animalsController.updateAvailability([req.params.availability, req.params.animalID])
    .then(res => results.status(200).send(res))
    .catch(error => results.status(500).json(error));
});

module.exports = router;