const  express = require('express');
const  mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const  session = require('express-session');
const  MongoStore = require('connect-mongo')(session);
const  app = express();
const  config = require('config');
const  dbConfig = config.get('Customer.dbConfig');
  
const  IP = process.env.IP;
const  PORT = process.env.PORT;

  mongoose.connect(dbConfig.url, dbConfig.options);

  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  app.use(express.static('.'));
  
  app.use(session(
    {
      secret: config.get('Customer.session.secret'),
      key: config.get('Customer.session.key'),
      cookie: config.get('Customer.session.cookie'),
      store: new MongoStore({mongooseConnection: mongoose.connection})
    }
  ));
  
  app.listen(PORT, IP, function(){
      console.log("The server is run  on \n port :", PORT, "\n ip", IP);
  });