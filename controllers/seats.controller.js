const { setMaxListeners } = require('../models/seat.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};   

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.newDocument = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const takenSeat = await Seat.findOne({day: day, seat: seat});
        if (takenSeat) {
            res.json({ message: "The slot is already taken..." });
        } else {
            const newSeat = new Seat ({
                day: day,
                seat: seat,
                client: client,
                email: email
            })
            await newSeat.save();
            req.io.emit('seatsUpdated', (await Seat.find()));
            res.json({ message: 'OK' });
        }

    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.changeDocument = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const seat = await(Seat.findById(req.params.id));
        if(seat) {
            seat.day = day,
            seat.seat = seat,
            seat.client = client,
            seat.email = email;

        await seat.save();
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
        const seat = await(Seat.findById(req.params.id));
        if(seat) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({message: 'OK', deletedDocument: seat});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};