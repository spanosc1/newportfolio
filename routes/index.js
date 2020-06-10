var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const sendmail = require('sendmail')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chris Spanos' });
});

/* POST contact me */
router.post('/message', function(req, res, next) {
  let text = req.body.message + "<br><br> from " + req.body.name + " via chrisspanos.me";
  sendmail({
    from: req.body.email,
    to: 'spanosc1@tcnj.edu',
    subject: 'Website Contact Form',
    html: text
  }, function(err, reply) {
    if(err)
    {
      console.log(err);
      res.status(200).json({message: "error"});
    }
    else
    {
      res.status(200).json({message: "success"});
    }
  });
  
});

module.exports = router;
