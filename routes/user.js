module.exports = function(app, models) {
	"use strict";

	app.post('/user/add/:id', function(req, res){

		var campaignId = req.params.id;
		var token = "";
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


		var email = "test@example.com"

		var user = {email : email};

		//TODO : add Token from post request.
		models.Token.checkToken("testtttt", function(token){
			 models.User.addUser(user.email, user.first, user.last)
		});
	});

};