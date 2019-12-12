var sponsor = {
  firstname:  null,
  lastname:   null,
  twitter:    null,
  picture:    null
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var reader = new FileReader()

  var files = ev.dataTransfer.files;
  if (files.length >= 1) {
    var file = files[0];

    reader.onload = function(e) {
      sponsor.picture = e.target.result;
      ev.target.style.backgroundImage='url('+e.target.result+')';
    };
    reader.readAsDataURL(file);
  }
}

function sendSponsor() {
  sponsor.firstname = document.querySelector('#firstname').value;
  sponsor.lastname = document.querySelector('#lastname').value;
  sponsor.twitter = document.querySelector('#twitter').value;
  sponsor.role = document.querySelector('#role').value;

  if (sponsor.picture == null) return null;
  if (sponsor.firstname == '') return null;
  if (sponsor.lastname == '') return null;
  if (sponsor.firstname == '') return null;
  
  Server.postSponsor(sponsor, function() {
    window.location.reload();
  });
}