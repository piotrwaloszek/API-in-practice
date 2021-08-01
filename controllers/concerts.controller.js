const Concert = require('../models/concert.model');
const Workshop = require('../models/workshops.model');

exports.getAll = async (req, res) => {
    try {
        const concerts = await Concert.find().lean();
        const concertsWithWorkshops = [];

        for(const concert of concerts) {
            concertsWithWorkshops.push({
                ...concert,
                workshops: await Workshop.find({ concertId: concert._id }).lean()
            })
        }

        res.json(concertsWithWorkshops);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
exports.getByPerformer = async (req, res) => {
    try {
        const concert = await Concert.findOne({performer: req.params.performer});
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
exports.getByGenre = async (req, res) => {
    try {
        const concert = await Concert.findOne({genre: req.params.genre});
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByDay = async (req, res) => {
    try {
        const concert = await Concert.findOne({ day: parseInt(req.params.day) });
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByPrice = async (req, res) => {
    try {
        const concert = await Concert.findOne({price: {$gte: req.params.price_min, $lte: req.params.price_max}});
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
    
exports.newDocument = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ 
            performer: performer, 
            genre: genre, 
            price: price, 
            day: day, 
            image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
};
    
exports.changeDocument = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const concert = await(Concert.findById(req.params.id));
        if(concert) {
            concert.performer = performer, 
            concert.genre = genre, 
            concert.price = price, 
            concert.day = day, 
            concert.image = image;
        await concert.save();
        res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
    
exports.deleteDocument = async (req, res) => {
    try {
        const concert = await(Concert.findById(req.params.id));
        if(concert) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({message: 'OK', deletedDocument: concert});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
    