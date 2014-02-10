module.exports = function(app, db, config, mongoose) {

	var TokenSchema = new mongoose.Schema({
		value 		: { type: String, unique: true },
		campaign_Id  	: {type : Number}	
	});

	var TokenModel = mongoose.model('Token', TokenSchema);

	var addToken  =  function(value,  campaignId){
		console.log("adding"+ value);

		var token = new TokenModel({
			value 		: value,
			campaignId 	: campaignId
		});

		token.save(function(err, data){
			if(err) throw err;
			else 
				console.log('adding token');

		});
	};

	var checkToken  =  function(value, callback){
		/*TokenModel.findOne({value:value},function(err,doc){
			console.log(doc);
      			if(doc){
      				callback(doc);
      			}
      			else{
      				console.log("No Valid Token");
      				return false;
      			}
    		});*/
		 callback();

	};

	var removeOldTokens = function(dateNow){
		TokenModel.find({},function(err,tokens){
			if(err) throw err;
			tokens.forEach(function(token, i){
				if(dateNow - (token._id.getTimestamp().getTime())/1000 > config.MAX_TIME_TOKEN){
					TokenModel.remove({ _id: token._id }, function (err) {
						if(err) throw err;
					});
				}
			});

		});
	};

	return {
		addToken 		: addToken,
		checkToken 		: checkToken,
		removeOldTokens	: removeOldTokens
	}


}