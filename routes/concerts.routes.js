const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.newDocument);

router.put('/concerts/:id', ConcertController.changeDocument);

router.delete('/concerts/:id', ConcertController.deleteDocument);

module.exports = router;