var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express(),
  session = require('express-session'),
  config = require('config'),
  dbConfig = config.get('Customer.dbConfig'),
  
  IP = process.env.IP,
  PORT = process.env.PORT;

  //mongoose.connect(dbConfig.url, dbConfig.options);

  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  app.use(express.static('.'));
  
  app.get('/', function (request, response) {
    response.sendfile('index.html');
  });
  
  app.listen(PORT, IP, 
  
  function(){
      console.log("The server is run  on \n port :", PORT, "\n ip", IP);
  },
  function(err){
      console.log("Can't run server at :", PORT, "\n ip", IP, "\n ERROR : ", err);
  });