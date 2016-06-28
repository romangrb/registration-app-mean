
module.exports = function(app, passport) {
    
    app.get('/', function(req, res) {
        res.send('index.html');
    });
    // route for home page
    app.get('/jade', function(req, res) {
        res.render('templates/index.ejs'); // load the index.ejs file
    });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form
    // route for showing the profile page
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('templates/signup.ejs', { message: req.flash('signupMessage') });
    });

    
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('templates/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}