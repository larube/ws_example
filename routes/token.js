module.exports = function(app, models) {
	"use strict";

	app.post('/token/insert/:id', function(req, res){

		var campaignId = req.params.id;
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
		models.Token.addToken('testwaiaiaii666', campaignId);
	});

};