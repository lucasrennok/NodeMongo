var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET cidadelist page. */
router.get('/cidadelist', function(req, res) {
    var db = require("../db");
    var cidades = db.Mongoose.model('prova', db.cidadeSchema, 'prova');
    cidades.find({}).lean().exec(
       function (e, docs) {
           res.render('cidadelist', { "cidadelist": docs });
       });
});

router.get('/cidadeerro', function(req, res, next) {
    res.render('cidadeerro', { title: 'Erro Cep procura' });
  });

router.get('/procuracidade', function(req, res, next) {
    res.render('procuracidade', { title: 'Cep procura' });
  });
  
/* POST to Add cidade Service */
router.post('/searchcidade', function (req, res) {

    // request
    var db = require("../db");
    var cep = req.body.cep;

    var dataResp = undefined;
    fetch(`https://viacep.com.br/ws/${encodeURIComponent(cep)}/json/`).then(function(resp){
       return resp.json();
    })
    .then((jsonData) => {
        dataResp = jsonData;
        console.log(jsonData);
        
        var cidadeProcurar = dataResp.localidade;
        console.log(cidadeProcurar)

        var cidades = db.Mongoose.model('prova', db.cidadeSchema, 'prova');
        var cidade = cidades.find({ cidade: cidadeProcurar });
        cidade.lean().exec(
            function (e, docs) {
                console.log(docs)
                if(docs.length == 0){
                    res.redirect("cidadeerro");
                }else{
                    res.render('cidadeespecifica', { "cidadeespecifica": docs });
                }
            });
    })
    .catch(function(error) {
        console.log(error);
        res.redirect("cidadeerro");
    });
});

/* GET newcidade page. */
router.get('/newcidade', function (req, res, next) {
    res.render('newcidade', { title: 'Nova cidade' });
});

/* POST to Add cidade Service */
router.post('/addcidade', function (req, res) {

    var db = require("../db");
    var cidadecidade = req.body.cidade;
    var cidadetemp = req.body.temp;

    var cidades = db.Mongoose.model('prova', db.cidadeSchema, 'prova');
    var cidade = new cidades({ cidade: cidadecidade, temp: cidadetemp });
    cidade.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("cidadelist");
        }
    });
});

module.exports = router;
