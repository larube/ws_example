module.exports = function(app, db, config, mongoose) {

	var bcrypt= require('bcrypt-nodejs');

	var MozooUserSchema = new mongoose.Schema({
		local: {
			email : String,
			password: String,
		}
	});

	var MozooModel = mongoose.model('MozooUser', MozooUserSchema);


	var generateHash =  function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	var validPassword = function(password, encrypted){
		return bcrypt.compareSync(password, encrypted);
	}

	return {

		MozooModel 		: MozooModel,
		generateHash 		: generateHash,
		validPassword 		: validPassword


	}

};