const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    res.json(concert);
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day, image} = req.body;
    req.body.id = uuidv4();

    if (performer && genre && price && day){
        performer;
        genre;
        price;
        day;
        image;
        db.concerts.push(req.body);
        res.json({message: 'OK'});
    } else {
        res.json({message: 'Please put all informations'});
    }
});

router.route('/concerts/:id').put((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    const {performer, genre, price, day, image} = req.body;
    
    if(performer && genre && price && day){
        concert.performer = performer;
        concert.genre = genre;
        concert.price = price;
        concert.day = day;
        concert.image = image;
        res.json({message: 'OK'});
    } else {
        res.json({message: 'Please put all informations'});
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const concertToDel = db.concerts.indexOf(db.concerts.find(item => item.id == req.params.id));
    db.concerts.splice(concertToDel, 1);
    res.json({message: 'OK'});
});

module.exports = router;