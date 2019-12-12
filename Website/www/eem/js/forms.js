var Forms = {
  root: null,
  
  fields: {
    firstname: null,
    lastname: null,
    country: null,
    email: null,
    job: null,
    city: null,
    other: null
  },
  
  init: function() {
    Forms.root = document.querySelector('#forms');
    
    Forms.fields.firstname = document.querySelector('form #firstname');
    Forms.fields.lastname = document.querySelector('form #lastname');
    Forms.fields.country = document.querySelector('form #country');
    
    Forms.fields.email = document.querySelector('form #email');
    Forms.fields.job = document.querySelector('form #job');
    Forms.fields.city = document.querySelector('form #city');
    Forms.fields.other = document.querySelector('form #other');
  },
  
  show: function() {
    Forms.clear();
    Forms.root.className = 'visible';
  },
  
  clear: function() {
    for (var i in Forms.fields) {
      Forms.fields[i].value = '';
      Forms.fields[i].classList.remove('invalid');
    }
  },
  
  quit: function() {
    Forms.clear();
    Signature.clear();
    Forms.root.className = '';
  },
  
  validateFields: function(fields) {
    var valid = true;
    
    for (var i in fields)
      if (fields[i].value.length < 2) {
        fields[i].classList.add('invalid');
        valid = false;
      } else {
        fields[i].classList.remove('invalid');
      }
    
    return valid;
  },
  
  validateSend: function() {
    var valid = Forms.validateFields([
      Forms.fields.firstname,
      Forms.fields.lastname,
      Forms.fields.country
    ]);
    
    if (valid) {
      Forms.root.classList.add('wait');
      
      Server.postSignature({
        "firstname": Forms.fields.firstname.value,
        "lastname": Forms.fields.lastname.value,
        "country": Forms.fields.country.value,
        "signature": Signature.pad.toDataURL('image/svg+xml')
      }, function() {
        Forms.root.classList.remove('wait');
        Forms.showShare()
      });
    } 
  },
  
  validateSubscribe: function() {
    var valid = Forms.validateFields([
      Forms.fields.email,
      Forms.fields.job,
      Forms.fields.city
    ]);
    
    if (valid) {
      Forms.root.classList.add('wait');
      
      Server.postSubscription({
        "firstname": Forms.fields.firstname.value,
        "lastname": Forms.fields.lastname.value,
        "email": Forms.fields.email.value,
        "job": Forms.fields.job.value,
        "city": Forms.fields.city.value,
        "country": Forms.fields.country.value,
        "other": Forms.fields.other.value
      }, function() {
        Forms.root.classList.remove('wait');
        
        Signature.quit();
      });
    } 
  },
  
  showShare: function() {
    Forms.root.className = 'visible share';
  },
  
  showSubscribe: function() {
    Forms.root.className = 'visible subscribe';
  },
  
  
  shareTwitter: function() {
    var msg = encodeURI("Ensemble, remettons l'Europe en Marche et signons la tribune de @EuropeEnMarche !");
    var url = encodeURI("http://www.europe-en-marche.fr");
    
    window.open('http://twitter.com/home?status='+msg+'+'+url);
  },
  shareFacebook: function() {
    var msg = encodeURI("Ensemble, remettons l'Europe en Marche et signons la tribune de @EuropeEnMarche !");
    var url = encodeURI("http://www.europe-en-marche.fr");
    
    window.open('http://www.facebook.com/share.php?u='+url+'&title='+msg);
  }
};

Forms.init();