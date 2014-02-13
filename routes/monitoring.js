module.exports = function(app, models, config, passport, isLoggedIn) {

	"use strict";

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

/*	app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', 
			failureRedirect : '/signup', 
			failureFlash : true 
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
*/
	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});


};