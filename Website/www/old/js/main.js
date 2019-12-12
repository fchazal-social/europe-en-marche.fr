window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    document.querySelector('header').className = 'small';
  } else {
    document.querySelector('header').className = '';    
  }
});


Server.getCounter(function(event) {
  var response = event.target.response;
  var container = document.querySelector('#banner h3 em');

  container.innerHTML = response.count;
});


Server.getText(function(event) {
  Text.source = event.target.response;
  Text.changeLanguage();
});


Server.getFounders(function(event) {
  var response = event.target.response;

  // WRITERS
  var container = document.querySelector('#writers .container');
  response.sort(function(b, a) { return a.firstname.localeCompare(b.firstname);});
  response.forEach(function(founder) {
    var element = document.createElement('div');

    element.classList.add('signer');

    element.innerHTML += '<div class="picture" style="background-image: url(' + founder.signature + ')"></div>';
    element.innerHTML += '<div class="name">' + founder.firstname + ' ' + founder.lastname.toUpperCase() + '</div>';

    container.appendChild(element);
  });

  // FOOTER
  var container = document.querySelector('#contact');
  response.sort(function(a, b) { return a.firstname.localeCompare(b.firstname);});
  response.forEach(function(founder) {
    var element = document.createElement('div');

    element.classList.add('founder');

    element.innerHTML += '<div class="picture" style="background-image: url(' + founder.picture + ')"><a class="twitter" href="' + founder.twitter + '" target="_blank"></a></div>';
    element.innerHTML += '<div class="name">' + founder.firstname.toLocaleUpperCase() + '</div>';

    container.appendChild(element);
  });
});


Server.getSponsors(function(event) {
  var response = event.target.response;
  var container = document.querySelector('#sponsors .container');

  response.forEach(function(sponsor) {
    var element = document.createElement('div');

    element.classList.add('signer');

    element.innerHTML += '<div class="picture" style="background-image: url(' + sponsor.picture + ')"></div>';
    element.innerHTML += '<div class="name">' + sponsor.firstname + ' ' + sponsor.lastname.toUpperCase() + '</div>';   
    element.innerHTML += '<div class="role">' + sponsor.role + '</div>';   

    container.appendChild(element);
  });
});


var nbSignatures = 0;
function moreSignatures() {
  Server.getSignatures(nbSignatures, function(event) {
    var response = event.target.response;
    var container = document.querySelector('#signatures .container');

    response.forEach(function(people) {
      var element = document.createElement('div');

      element.classList.add('signer');

      element.innerHTML += '<div class="picture" style="background-image: url(' + encodeURI(people.signature) + ')"></div>';
      element.innerHTML += '<div class="name">' + people.firstname + ' ' + people.lastname.toUpperCase() + '</div>';

      container.appendChild(element);
      nbSignatures++;
    });
  });
}

moreSignatures();