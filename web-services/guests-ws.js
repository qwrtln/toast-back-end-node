var express = require('express');
var fs = require('fs');
var app = module.exports = express.Router();

app.post('/api/submit', function(req,res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const desc = req.body.email + ", " + new Date().toLocaleString() + ",\n";

  fs.appendFile("goscie", desc, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!: " + JSON.stringify(req.body));
  });
  res.status(200).send();
});

app.get('/api/guests', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  fs.readFile("goscie", "utf8", function(err, data){
      if(err) throw err;


    //do operation on data that generates say resultArray;
    res.status(200).send(data);
  });

});
