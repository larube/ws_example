module.exports = function(app, db, config, mongoose) {

	var UserSchema = new mongoose.Schema({
		email:{ type: String, unique: true },
		name: 	{
				first 	: { type: String, required : false },
				last 	: { type: String, required : false }
			}
	});

	var UserModel = mongoose.model('User', UserSchema);

	var registerCallback = function(err) {
		if (err) {
			return console.log(err);
		};
			return console.log('User was created');
	};


	var addUser =  function(email, firstName, lastName){
		console.log("adding"+ email);

		var user = new UserModel({

			email : email,
			name :{
				first: firstName,
       				last: lastName,
			}
		});

		user.save(registerCallback);
		console.log('Saving user');

	};


	return{
		addUser : addUser
	}

}