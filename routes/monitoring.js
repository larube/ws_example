module.exports = function(app, models, config, passport, isLoggedIn) {
	"use strict";

	app.get('/monitoring/userEmail', function(req, res){
            
            var token = (new Date()).getTime();
            var campaignId = 1;
		
		models.Token.addToken(token, campaignId,function(token){
                    models.Token.checkToken(token, function(token){
                            models.User.addUser(user,campaignId,token.value,function(token) {
                                models.Token.removeToken(token);
                            });
                    });
                });
                
                
                var user = {
                    email       :   token,
                    firstname   :   "Yaga",
                    lastname    :   "Ranjit",
                };

		//TODO : add Token from post request.
		models.Token.checkToken(token, function(token){
			models.User.addUser(user,campaignId,token.value,function(token) {
                            models.Token.removeToken(token);
                        });
		});
                res.end();
		//TODO : add Token from post request.
		//models.Token.addToken(token, campaignId);
	});

};