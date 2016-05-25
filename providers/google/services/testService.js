"use strict"
var GoogleService = require('./GoogleService.js');

var service = new GoogleService();



/*authorize.getAuth(function(auth){
	service.getGroups(auth,function(err,list){
		console.log(list ,err );
});*/


service.authorize.getAuth(function(auth){
	service.getGroupMembers(auth,function(err,list){
		 console.log(list,err );
		},"bi@linnovate.net");
	});

/* TODO Sync Version
 service.init();
 service.getGroups(service.auth,function(list){
 console.log(list );

service.getGroupMembers(service.auth,function(list){
	 console.log(list );
	},"bi@linnovate.net");
	}); 
	*/




