module.exports = function(app, db, config, mongoose) {

	var UserSchema = new mongoose.Schema({
		email:{ type: String, unique: true },
		name: 	{
				first 	: { type: String, required : false },
				last 	: { type: String, required : false }
			},

		campaigns : { type : Array }

	});

	var UserModel = mongoose.model('User', UserSchema);

	var registerCallback = function(err) {
		if (err) {
			return console.log(err);
		};
			return console.log('User was created');
	};


	var addUser =  function(email, firstName, lastName, campaign){
		console.log("adding"+ email);
		UserModel.findOne({email : email}, {}, function(err, user){
			if(!user){
				var user = new UserModel({

					email : email,

					name :{
						first: firstName,
		       				last: lastName,
					},

				});

				user.campaigns.push(campaign)
				user.save(registerCallback);
				console.log('Saving user');
			}
			else{
				UserModel.update({email : email}, {$push: {campaigns : campaign}}, function(err){
					if (err) throw err;
					else console.log("succesfully updated");
				});
			}
		})
	};

	var getUsersFromCampaign = function (campaignId, callback){

		UserModel.find({campaigns : { $in : [campaignId]}}, {email:true, _id: false}, function(err,users){
			if(err) throw err;
			callback(users);	
		});
	};


	return{
		addUser 			: addUser,
		getUsersFromCampaign	: getUsersFromCampaign
	}

}