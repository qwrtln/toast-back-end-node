var express = require('express');
var fs = require('fs');
var app = module.exports = express.Router();

app.get('/questions', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  fs.readFile("content/faq.content.json", "utf8", function(err, data){
      if(err) throw err;

      var resultData = JSON.parse(data); //do operation on data that generates say resultArray;

      res.status(200).send(resultData);
  });

});
