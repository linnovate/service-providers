
"use strict"
var Service = require('./Service.js');
var Authorize = require('./Authorize.js'); 
var google = require('googleapis'); 	//Used to interact with the Google Apps API

class GoogleService extends Service {
  constructor() {
    super();
    this.authorize = new Authorize();
  }

	/*
     // TODO Sync Solution
	init() {		
		this.auth = authorize.getAuth();

    }*/

  /**
   * Lists the first 100 users in the domain.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
   getGroups(auth,callback) {	
   	console.log("getGroups :" ,auth);
   	var service = google.admin('directory_v1');
   	service.groups.list({
   		auth: auth,
   		customer: 'my_customer',
   		maxResults: 100,
   		orderBy: 'email',
   	},function(err, res){
   		callback(err,res);
   	})
   }

   getGroupMembers(auth,callback,groupKey) {
   	var service = google.admin('directory_v1');
   	service.members.list({
   		auth: auth,
   		customer: 'my_customer',
   		maxResults: 100,
   		orderBy: 'email',
   		groupKey: groupKey
   	},function(err, res){
		  //	console.log(err);	   
		  callback(err,res);		  
		})				
   }


}

module.exports = GoogleService;
