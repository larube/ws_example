module.exports = function(app, db, config, mongoose) {

    var UserSchema = new mongoose.Schema({
        email: {type: String, unique: true},
        campaigns: {type: Array},
        name: {
            firstname: {type: String, required: false},
            lastname: {type: String, required: false}
        }
    });

	var UserModel = mongoose.model('User', UserSchema);

	var registerCallback = function(err) {
		if (err) {
			return console.log(err);
		};
			return console.log('User was created');
	};


	var addUser =  function(user, campaignId, token, callback){
		console.log("adding"+ user.email);
		UserModel.findOne({email : user.email}, {}, function(err, userMongo){
			if(!userMongo){
				var newUser = new UserModel({

					email : user.email,

					name :{
						firstName: user.firstname,
		       				lastName: user.lastname,
					},

				});

				newUser.campaigns.push(campaignId)
				newUser.save(registerCallback);
				console.log('Saving user');
			}
			else{
				UserModel.update({email : user.email}, {$addToSet: {campaigns : campaignId}}, function(err){
					if (err) throw err;
					else console.log("succesfully updated");
                                        callback(token);
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