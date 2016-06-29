const  express = require('express');
const  mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const  session = require('express-session');
const  app = express();
const  config = require('config');
const  dbConfig = config.get('Customer.dbConfig');
const  passport = require('passport');
const  flash    = require('connect-flash');
const  morgan       = require('morgan');
const  cookieParser = require('cookie-parser');
  
const  IP = process.env.IP;
const  PORT = process.env.PORT;

  // configuration ===============================================================
  
  mongoose.connect(dbConfig.url, dbConfig.options);
  
  require('./model/passport')(passport); // pass passport for configuration
  
  // set up our express application
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  // get information from html forms
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  //app.use(express.static('.'));
  app.set('views', './templates');

  app.set('view engine', 'ejs'); // set up ejs for templating
  
  // required for passport
  app.use(session({ secret: '9TltZmW5odKJSf084B52WZ4T6445z95S' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
  
  // routes ======================================================================
  require('./server/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
  
  // launch ======================================================================
  
  app.listen(PORT, IP, function(){
      console.log("The server is run  on \n port :", PORT, "\n ip", IP);
  });