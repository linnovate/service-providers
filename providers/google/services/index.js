'use strict'
var Service = require('./Service.js');
var Authorize = require('./Authorize.js');
var google = require('googleapis'); //Used to interact with the Google Apps API
var readline = require('readline');

class GoogleService extends Service {
  constructor(client_secret, client_id, redirect_uri) {
    super();
    this.authorize = new Authorize(client_secret, client_id, redirect_uri);
  }


  /*
     // TODO Sync Solution
	init() {		
		this.auth = authorize.getAuth();

    }*/

  sdkManager(resource, method, options, callback) {
    this.authorize.getAuth(function(auth) {
      options.auth = auth;
      var service = google.admin('directory_v1');
      service[resource][method](options, function(err, res) {
        callback(err, res);
      })
    })

  }


}

module.exports = GoogleService;