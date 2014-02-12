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
		UserModel.findOne({email : user.email}, {}, function(err, user){
			if(!user){
				var user = new UserModel({

					email : user.email,

					name :{
						firstName: user.firstname,
		       				lastName: user.lastname,
					},

				});

				user.campaigns.push(campaignId)
				user.save(registerCallback);
				console.log('Saving user');
			}
			else{
				UserModel.update({email : user.email}, {$push: {campaigns : campaignId}}, function(err){
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