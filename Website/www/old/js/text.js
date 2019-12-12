
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
     var pair = vars[i].split("=");
     if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

var Text = {
  lang: null,
  source: null,
  
  language: null,
  container: null,
  
  switch: {
    short: null,
    full: null
  },
  
  init: function() {
    Text.container = document.querySelector('#text .container');
    Text.language = document.querySelector('#text #lang');
    
    Text.switch.short = document.querySelector('#text button.short');
    Text.switch.full = document.querySelector('#text button.full');
    
    var query = getQueryVariable('lang');
    if (query) {
      window.location = window.location.origin + window.location.pathname + '#/lang/'+query;
    }

    var re = /\/lang\/([a-z]+)/;
    var hash = re.exec(window.location.hash);
    if (hash)
      Text.lang = hash[1];
    else
      Text.lang = 'fr';
  },
  
  changeLanguage: function(lang) {
    Text.language.querySelector('li.'+Text.lang).classList.remove('selected');
    if (lang) Text.lang = lang;
    Text.language.querySelector('li.'+Text.lang).classList.add('selected');

    window.location.hash = '#/lang/'+Text.lang;
    
    var locale = Text.source[Text.lang];
    Text.container.innerHTML = '';
    
    locale.text.forEach(function(part) {
      var section = document.createElement('div');

      section.innerHTML += '<h2>' + part.title + '</h2>';
      section.innerHTML += part.content;

      Text.container.appendChild(section);
    });
  
    Text.switch.short.innerHTML = locale.switch.short;
    Text.switch.full.innerHTML = locale.switch.full;
  },
  
  fullVersion: function() {
    Text.container.querySelectorAll('.collapse').forEach(function(elt) {
      elt.classList.add('off');
    });

    Text.switch.short.classList.remove('selected');
    Text.switch.full.classList.add('selected');
  },
  
  shortVersion: function() {
    Text.container.querySelectorAll('.collapse').forEach(function(elt) {
      elt.classList.remove('off');
    });

    Text.switch.full.classList.remove('selected');
    Text.switch.short.classList.add('selected');
  }
}

Text.init();
