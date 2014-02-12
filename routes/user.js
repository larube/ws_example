module.exports = function(app, models, config, passport, isLoggedIn) {

	"use strict";

	app.post('/user/add/:id', function(req, res){

		var campaignId = parseInt(req.params.id,10);
                
		var token =  req.body.token;
		var email =  req.body.email;
		var firstname =  req.body.firstname;
		var lastname =  req.body.lastname;
		var origin = (req.headers.origin || "*");

		//TODO : add Token from post request, email, 

		res.writeHead(
			"204",
			"No Content",
			{
				"access-control-allow-origin": origin,
				"access-control-allow-methods": "POST",
				"access-control-allow-headers": "content-type, accept",
				"access-control-max-age": 10, // Seconds.
				"content-length": 0
			}
		);
        

                var user = {
                    email       :   email,
                    firstname   :   firstname,
                    lastname    :   lastname,
                };

		//TODO : add Token from post request.
		models.Token.checkToken(token, function(token){
			models.User.addUser(user,campaignId,token.value,function(token) {
                            models.Token.removeToken(token)
                        });
		});
	});


	app.get('/user/getFromCampaign',  isLoggedIn, function(req, res){
		var 	curl 		= require('curlrequest');
			
		var options = {
			url : config.WS_GET_CAMPAIGNS
		};

		curl.request(options, function (err, campaigns) {
			if (err){
				console.log(err);
				res.send(err);
				return;
			}
			campaigns = JSON.parse(campaigns);
			res.render('getUsersFromCampaign.ejs', {
				campaigns : campaigns
			});
		});	
	});

	app.post('/user/getAllFromCampaign', isLoggedIn, function(req, res) {
		var campaignId = parseInt(req.body.campaignId,10);
		models.User.getUsersFromCampaign(campaignId, function(users){
			var csv = require('csv'); 
			var dataUsers ="";

			for(var i=0; i < users.length;i++){
				dataUsers+='"'+users[i].email+'"';
				if(i!=(users.length)-1){
					dataUsers+=";\n"
				}
			}
			 var filename = 'users_'+campaignId+'.csv';
  			res.attachment(filename);
  			res.end(dataUsers, 'UTF-8');

		});
	});


};