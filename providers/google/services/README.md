# Service Provider

The goal of this package is to use Services from various source


Features:
* Using Services progrematicly


## External dependencies



## Usage

```bash
go get github.com/linnovate/service-providers
```

Create a new node file, and in your `code`:

```javascript

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


```

