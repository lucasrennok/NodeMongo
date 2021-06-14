var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/prova');

var cidadeSchema = new mongoose.Schema({
    cidade: String,
    temp: String
}, { collection: 'prova' }
);

module.exports = { Mongoose: mongoose, cidadeSchema: cidadeSchema }