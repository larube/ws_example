var express = require('express');
var app     = express();
var mongoose= require('mongoose');
var fs = require('fs');

// configuration ===========================================
	
// config files
var db            = require('./config/db');
var config      = require('./config/settings');

var port = process.env.PORT || 9000; // set our port
 mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)


var enableCORS = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
           res.send(200);
      }
      else {
            next();
      }
};

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 
	app.use(express.logger('dev')); 			
      app.use(enableCORS);
	app.use(express.bodyParser()); 				
	app.use(express.methodOverride()); 			
});


// Import des models ==================================================
var models ={};
fs.readdirSync('app/models').forEach(function(model) {
  if ( model[0] == '.' ) return;
  var modelName = model.substr(0, model.indexOf('.'));
  models[modelName]=(require('./app/models/'+modelName)(app, db , config, mongoose))
});


// Import des routes ==================================================
fs.readdirSync('routes').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)(app, models);
});

// Import des crons ==================================================
fs.readdirSync('cronjob').forEach(function(cron) {
  if ( cron[0] == '.' ) return;
  var cronName = cron.substr(0, cron.indexOf('.'));
  require('./cronjob/' + cronName)(app, models, config);
});

// start app ===============================================
app.listen(port);										
console.log('Express server listening on port' + port); 			
exports = module.exports = app; 	