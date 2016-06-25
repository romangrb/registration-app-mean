var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  app = express(),
  config = require('config'),
  dbConfig = config.get('Customer.dbConfig'),
  
  IP = process.env.IP,
  PORT = process.env.PORT;

  mongoose.connect(dbConfig.url, dbConfig.options);

  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  app.use(express.static('.'));
  
  app.use(session({
      secret: config.get('Customer.session.secret'),
      key: config.get('Customer.session.key'),
      cookie: config.get('Customer.session.cookie'),
      store: new MongoStore()
  }));
  
  app.get('/', function (req, res, next) {
      res.sendfile('index.html');
  });
  
  app.listen(PORT, IP, 
      function(){
          console.log("The server is run  on \n port :", PORT, "\n ip", IP);
      },
      function(err){
          console.log("Can't run server at :", PORT, "\n ip", IP, "\n ERROR : ", err);
      }
  );