module.exports = function(app, models, config, passport, isLoggedIn) {
	"use strict";

	app.post('/token/insert/:id', function(req, res){

		var campaignId = parseInt(req.params.id,10);
                var token = req.body.token;
		var origin = (req.headers.origin || "*");
		
		//TODO : add Token from post request.

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

		//TODO : add Token from post request.
		models.Token.addToken(token, campaignId);
                res.end();
	});

};