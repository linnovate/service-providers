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

var GoogleService = require('service-providers')('google');
var service = new GoogleService(yourClientSecret, yourClientID, yourCallbackURL);

service.sdkManager('members', 'list', {
    // groupKey: 'group@example.com',
    // memberKey: 'member@example.com',
    // resource: {
    //     "email": "rivkat@linnovate.net",
    //     "role": "MEMBER"
    // }
}, function(err, list) {
    console.log(list, err);
})

```



