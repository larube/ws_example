module.exports = function(app, models, config){

	"use strict";

	var timeMinutesTokenDelete = '*/'+(config.MAX_TIME_TOKEN / 60).toString(); 

	var cronFrequency = ['0', timeMinutesTokenDelete, '*', '*', '*', '*'].join(' ');

	var cronJob = require('cron').CronJob;
			new cronJob(cronFrequency, function(){
			var date = new Date();
			var date = Math.ceil(date.getTime()/1000);
			console.log("doing cron");
			models.Token.removeOldTokens(date);
		}, null, true);

}
