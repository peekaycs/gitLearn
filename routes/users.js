const express = require('express');
const validate = require('./../config/validate');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body;
	validate(req.body).then( status => {
		if(status){
			const newUser = new User({name, email, password});
			User.findOne({email:email}).then( user => {
				if(user){
					const errors = [];
					errors['email']	= 'Email already exists';
					res.render('register', {name, email, password, errors});
				}else{
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) throw err;
							newUser.password = hash;
							newUser.save()
							.then( user => {
								req.flash('success_msg','You are now registered and can login');
								res.redirect('/users/login');
							})
							.catch(err => {
								throw err;
							});
						})
					});
				}
			});
		}
	}).catch(	errors => {
		res.render('register', {name, email, password, errors});
	});

})

router.post('/login', (req, res, next) => {
	passport.authenticate('local',{
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req,res, next)
})

module.exports = router;