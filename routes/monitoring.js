module.exports = function(app, models, config, passport, isLoggedIn) {
	"use strict";

	app.get('/monitoring/userEmail', function(req, res){
            
            var token = "ohoh"+(new Date()).getTime()+"fezfzef";
            var campaignId = 1;
		
		models.Token.addToken(token, campaignId);
                
                
                var user = {
                    email       :   token,
                    firstname   :   "Yaga",
                    lastname    :   "Ranjit",
                };

		//TODO : add Token from post request.
		models.Token.checkToken(token, function(token){
			models.User.addUser(user,campaignId,token.value,function(token) {
                            models.Token.removeToken(token)
                        });
		});
                res.end();
		//TODO : add Token from post request.
		//models.Token.addToken(token, campaignId);
	});

};