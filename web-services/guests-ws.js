const express = require('express');
const fs = require('fs');
const app = module.exports = express.Router();
const nodemailer = require('nodemailer');

const config = require("../config.json");
const mailConfig = config.mailConfig;

app.post('/api/submit', function(req,res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  sendMailWithGuestData(req.body.email);

  const desc = req.body.email + ", " + new Date().toLocaleString() + ",\n";

  fs.appendFile(config.guestsFile, desc, function(err) {
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

function sendMailWithGuestData(guestEmail) {
  let transporter = nodemailer.createTransport({
    host: mailConfig.server,
    port: mailConfig.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    }
  });

  let mailOptions = {
    from: mailConfig.sender,
    to: mailConfig.receiver,
    subject: 'Nowy kontakt na stronie',
    html: '<h2>Hurra, hurra!</h2><p>Ludzie nas kochają i zostawiają nam swoje maile!</p> ' +
    '<p>Wiedz, że jakaś osoba użyła formularza na stronie <u>toastmastersstudents.pl</u>, aby pozostawić nam kontakt do siebie. Nie rozczarujmy go, wyślijmy mu jakąś ładną wiadomość powitalną :-)' +
    '<p><b>Mail: </b> ' + guestEmail + '</p>' +
    '<p><b>Czas:</b> ' + new Date().toLocaleString() + '</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}
