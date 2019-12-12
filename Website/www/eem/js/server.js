/*
** SERVER
**********************************************************/

var Server = {
  url: ''
};

/*-------------------------------------------------------*/

Server.logResponse = function(e) {
  console.log('HTTP ' + this.status + ' - ' + this.response);
};

/*-------------------------------------------------------*/

Server.send = function(action, uri, content, callback) {
  var self = Server;

  var xhr = new XMLHttpRequest();

  xhr.open(action, self.url + uri, true);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Client-Id', window.ga_key);
  
  xhr.onload = function(event) {
    if (this.status == 401)
      Application.quit();
    else {
      var evt = {
        target: {
          status: this.status,
          response: this.response
        }
      };
      
      (callback || Server.logResponse).apply(evt.target, [evt]);
    }
  };
  
  xhr.onerror = function(event) {
    var evt = { target: {
        status: 999,
        response: 'network error'
      }};
    
    (callback || Server.logResponse).apply(evt.target, [evt]);
  };
  
  xhr.send(JSON.stringify(content));
  
  return xhr;
};

/*-------------------------------------------------------*/

// GET /api/counter
Server.getCounter = function(callback) {
  return Server.send('GET', '/api/counter', {}, callback);
};

/*-------------------------------------------------------*/

// GET /api/text
Server.getText = function(callback) {
  return Server.send('GET', '/api/text', {}, callback);
};

/*-------------------------------------------------------*/

// GET /api/founders
Server.getFounders = function(callback) {
  return Server.send('GET', '/api/founders', {}, callback);
};

/*-------------------------------------------------------*/

// GET /api/sponsors
Server.getSponsors = function(callback) {
  return Server.send('GET', '/api/sponsors', {}, callback);
};

/*-------------------------------------------------------*/

// GET /api/signatures
Server.getSignatures = function(id, callback) {
  return Server.send('GET', '/api/signatures?from='+id, {}, callback);
};


/*-------------------------------------------------------*/

// POST /api/signature
Server.postSignature = function(content, callback) {
  return Server.send('POST', '/api/signature', content, callback);
};

// POST /api/subscription
Server.postSubscription = function(content, callback) {
  return Server.send('POST', '/api/subscription', content, callback);
};
