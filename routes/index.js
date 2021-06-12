var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET clientlist page. */
router.get('/clientlist', function(req, res) {
    var db = require("../db");
    var Clients = db.Mongoose.model('clientcollection', db.ClientSchema, 'clientcollection');
    Clients.find({}).lean().exec(
       function (e, docs) {
           res.render('clientlist', { "clientlist": docs });
       });
});

/* GET newclient page. */
router.get('/newclient', function (req, res, next) {
    res.render('newclient', { title: 'New Client' });
});

/* POST to Add Client Service */
router.post('/addclient', function (req, res) {

    var db = require("../db");
    var clientCpf = req.body.cpf;
    var clientName = req.body.name;

    var Clients = db.Mongoose.model('clientcollection', db.ClientSchema, 'clientcollection');
    var client = new Clients({ cpf: clientCpf, name: clientName });
    client.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("clientlist");
        }
    });
});

/* GET removeclient page. */
router.get('/removeclient', function (req, res, next) {
    res.render('removeclient', { title: 'Remove Client' });
});

/* POST to Rmv Client Service */
router.post('/rmvclient', function (req, res) {

    var db = require("../db");
    var clientCpf = req.body.cpf;

    var Clients = db.Mongoose.model('clientcollection', db.ClientSchema, 'clientcollection');
    var client = Clients.find({ cpf: clientCpf });
    client.remove(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("clientlist");
        }
    });
})

module.exports = router;
