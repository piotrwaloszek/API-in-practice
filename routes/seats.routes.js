const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.newDocument);

router.put('/seats/:id', SeatController.changeDocument);

router.delete('/seats/:id', SeatController.deleteDocument);

module.exports = router;