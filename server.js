const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, './client/build')));
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const dbURI = process.env.NODE_ENV === 'production' ? 'mongodb+srv://Kasia:dostepdodanych@cluster0.6wyjv.mongodb.net/myAPIdb?retryWrites=true&w=majority' : 'mongodb://localhost:27017/NewWaveFestivalDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! ' + socket.id);
});