"use strict"
//Used to save the token to disk
var fs = require('fs');
var readline = require('readline'); //Used to let the user paste in the token to the CLI app
var google = require('googleapis'); //Used to interact with the Google Apps API
var googleAuth = require('google-auth-library'); //Used to go through the Google authentication process

//This is an array of the permissions the app must be granted by the user
///////In this case, just the admin.directory.group permission
var SCOPES = ['https://www.googleapis.com/auth/admin.directory.group'];

//This is where the token that that Google gives back to us gets saved by this app
var TOKEN_DIR = __dirname + '/tokens/';
var TOKEN_PATH = TOKEN_DIR + 'admin-directory_v1-nodejs-quickstart.json';

class Authorize {
  constructor() {}

  // Create an OAuth2 client with the given credentials 
  getAuth(callback) {


    fs.readFile(__dirname + '/client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }

      var credentials = JSON.parse(content);
      //console.log(credentials);
      var clientSecret = credentials.web.client_secret;
      var clientId = credentials.web.client_id;
      var redirectUrl = credentials.web.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          oauth2Client = getNewToken(oauth2Client);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          callback(oauth2Client);
        }
      });
    });
  }


  getAuthSync() {
    var content = fs.readFileSync('client_secret.json')
    var credentials = JSON.parse(content);
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = credentials.web.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    // Check if we have previously stored a token.
    var token = fs.readFileSync(TOKEN_PATH);
    if (token == null) {
      oauth2Client = getNewToken(oauth2Client);
    } else {
      oauth2Client.credentials = JSON.parse(token);
    }
    return oauth2Client;
  }

  /**
   * Store token to disk be used in later program executions.
   * @param {Object} token The token to store to disk.
   */
  storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }

}

/**
 * Get and store new token after prompting for user authorization
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 */
function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      return oauth2Client;
    });
  });
}


module.exports = Authorize;