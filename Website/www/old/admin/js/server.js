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

// POST /api/sponsor
Server.postSponsor = function(content, callback) {
  return Server.send('POST', '/api/sponsor', content, callback);
};
