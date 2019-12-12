
var Signature = {
  pad: null,
  timer: null,

  root: null,
  form: null,
  canvas: null,

  init: function() {
    Signature.root = document.querySelector('#signature');
    Signature.container = Signature.root.querySelector('.container');
    Signature.canvas = Signature.root.querySelector('canvas');
    Signature.form = Signature.root.querySelector('form');
    Signature.preview = Signature.root.querySelector('form .preview');
    
    Signature.pad = new SignaturePad(Signature.canvas, {
      minWidth: 3,
      maxWidth: 9,
      velocityFilterWeight: 0.2,
      penColor: 'rgb(33,33,33)'
    });

    Signature.container.onclick = function(e) {
      if (e.stopPropagation)
        e.stopPropagation();
      else
        e.cancelBubble = true;
    }
    
    window.addEventListener('resize', Signature.resize);
    Signature.resize();
  },
    
  show: function() {
    Signature.pad.clear();
    Signature.root.classList.add('visible');
  },
  
  quit: function() {
    if (Signature.timer) clearTimeout(Signature.timer);
    Signature.root.classList.remove('visible');
    Forms.quit();
  },
  
  resize: function() {
    var canvas = Signature.canvas;
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    
    Signature.pad.onBegin = Signature.onBegin;
    Signature.pad.onEnd = Signature.onEnd;
  },
  
  onBegin: function() {
    if (Signature.timer) clearTimeout(Signature.timer);
  },
  
  onEnd: function() {
    Signature.timer = setTimeout(function() {
      Signature.preview.style.backgroundImage = 'url('+Signature.pad.toDataURL('image/svg+xml')+')';
      
      Forms.show();
    }, 500);
  },
  
  clear: function() {
    Signature.pad.clear();
  }
};

Signature.init();
