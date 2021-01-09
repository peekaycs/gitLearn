const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = (passport) => {
	passport.use(
			new LocalStrategy({ userNameField: 'email', passwordField: 'password'}, (email, password, done) => {
				// match user

				User.findOne({email:email})
				.then(user => {
					if(!user){
						return done(null, false, {message: 'This email is not registered'});
					}
					// match password

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if(err) throw err;
						if(isMatch){
							return done(null, user);
						}else{
							return done(null, false, {message: 'Incorrect password'});
						}
					})
				})
				.catch(err => console.log(err));
			})
		);

	passport.serializeUser( (user, done) =>{
		done(null, user.id);
	});

	passport.deserializeUser( (id, done) => {
		User.findbyId(id, (err, user) => {
			done(err, user);
		});
	});
};

