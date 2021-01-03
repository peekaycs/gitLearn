const User = require('../models/User');

function Validate(data){
	return new Promise( (resolve, reject) => {
		const { name, email, password, password2 } = data;
		var status = true;
		const errors = [];
		if( name == ''){
			errors['name'] = 'Name field is required';
			status = false;
		}
		if( email == ''){
			errors['email'] = 'Email field is required';
			status = false;
		}
		if( password == ''){
			errors['password'] = 'Password field is required';
			status = false;
		}
		if( password2 == ''){
			errors['password2'] = 'Confirm password field is required';
			status = false;
		}
		if(password.length < 6){
			errors['password'] = 'Password should be at least 6 charachters long';
			status = false;
		}
		if(status){
			if(password !== password2){
				errors['password2'] = 'Password and confirm password do not match';
				status = false;
			}
		}
		if(status){
			resolve(true);
		}else{
			reject(errors);
		}
	});
}

User.find

module.exports = Validate;