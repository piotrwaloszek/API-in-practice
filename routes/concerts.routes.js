const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get('/concerts/price/day/:day', ConcertController.getByDay);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);

router.post('/concerts', ConcertController.newDocument);

router.put('/concerts/:id', ConcertController.changeDocument);
router.delete('/concerts/:id', ConcertController.deleteDocument);
module.exports = router;