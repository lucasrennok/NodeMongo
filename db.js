var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clients');

var clientSchema = new mongoose.Schema({
    cpf: String,
    name: String
}, { collection: 'clientcollection' }
);

module.exports = { Mongoose: mongoose, ClientSchema: clientSchema }