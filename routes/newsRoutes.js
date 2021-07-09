const router = require('express').Router();
const newsModel = require('../controllers/newsController');

router.post('/addNewsAnimal/:itemTypeID/:animalID', (req, results) => {
  newsModel.addNewsAnimal([req.params.itemTypeID, req.params.animalID])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addNewsEvent/:itemTypeID/:aDescription/:date', (req, results) => {
  newsModel.addNewsEvent([req.params.itemTypeID, req.params.aDescription, req.params.date])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addNewsNews/:itemTypeID/:aDescription', (req, results) => {
  newsModel.addNewsNews([req.params.itemTypeID, req.params.aDescription])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.delete('/deleteNews/:id', (req, results) => {
  newsModel.deleteNews([req.params.id])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getNews', (req, results) => {
  newsModel.getNews([])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});



module.exports = router;