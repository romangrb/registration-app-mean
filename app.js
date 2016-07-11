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
  app.set('views', './templates');
  
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  // get information from html forms
  app.use(express.static('.'));
  // app.set('view engine', 'ejs'); // set up ejs for templating
  /** bodyParser.urlencoded(options)
   * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
   * and exposes the resulting object (containing the keys and values) on req.body
   */
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  /**bodyParser.json(options)
   * Parses the text as JSON and exposes the resulting object on req.body.
   */
  app.use(bodyParser.json());
  
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