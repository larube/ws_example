module.exports = function(passport, models) {

	var LocalStrategy  	 = require('passport-local').Strategy;
	
	var User = models.MozooUser;

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.MozooModel.findById(id, function(err, user) {
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
		},function(req, email, password, done) {

			process.nextTick(function() {
				User.MozooModel.findOne({ 'local.email' :  email }, function(err, user) {
					if (err)
					return done(err);

					if (user) {
						console.log("email already in database");
					} else {


					var newUser            = new User.MozooModel;
					newUser.local.email    = email;
					newUser.local.password = User.generateHash(password);

					
					newUser.save(function(err) {
						if (err)
						throw err;
						return done(null, newUser);
					});
				}

			});    

		});

	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
		},function(req, email, password, done) { // callback with email and password from our form

			User.MozooModel.findOne({ 'local.email' :  email }, function(err, user) {

			if (err)
			return done(err);

			if (!user || !User.validPassword(password, user.local.password))
				return done(null, false, req.flash('loginMessage', 'No user and // or bad password .')); 
			
			return done(null, user);
		});

	}));

};
