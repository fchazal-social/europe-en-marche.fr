<!doctype html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

	<title>l'Europe en Marche</title>
	<link rel="icon" href="favicon.png">
 
	<!-- Android Web App -->
	<meta name="viewport" content="width=device-width">
	<meta name="mobile-web-app-capable" content="yes">
	
	<link rel="icon" sizes="192x192" type="image/png" href="favicon.png">
  
  <!-- Search Engine -->
  <meta name="description" content="Avec Emmanuel Macron, relançons la dynamique européenne !">
  <meta name="image" content="http://www.europe-en-marche.fr/data/social/opengraph.jpg">
  
  <!-- Schema.org for Google -->
  <meta itemprop="name" content="l'Europe en Marche">
  <meta itemprop="description" content="Avec Emmanuel Macron, relançons la dynamique européenne !">
  <meta itemprop="image" content="http://www.europe-en-marche.fr/data/social/opengraph.jpg">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="l'Europe en Marche">
  <meta name="twitter:description" content="Avec Emmanuel Macron, relançons la dynamique européenne !">
  <meta name="twitter:creator" content="@EuropeEnMarche">
  <meta name="twitter:image:src" content="http://www.europe-en-marche.fr/data/social/twitter.jpg">
  
  <!-- Open Graph general (Facebook, Pinterest & Google+) -->
  <meta name="og:title" content="l'Europe en Marche">
  <meta name="og:description" content="Avec Emmanuel Macron, relançons la dynamique européenne !">
  <meta name="og:image" content="http://www.europe-en-marche.fr/data/social/opengraph.jpg">
  <meta name="og:url" content="http://www.europe-en-marche.fr">
  <meta name="rog:site_name" content="l'Europe en Marche">
  <meta name="og:locale" content="fr_FR">
  <meta name="og:type" content="website">

  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/header.css" />
  <link rel="stylesheet" href="css/sections.css" />
  <link rel="stylesheet" href="css/footer.css" />
  <link rel="stylesheet" href="css/signature.css" />

  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,200i,300,300i,400,400i,700,700i" rel="stylesheet">
</head>
 

<body class="start">

<header class="">
  <img id="logo" src="img/logo_d.svg">
  
  <menu class="left">
    <li>
      <a href="https://www.twitter.com/EuropeEnMarche/" target="_blank"><img class="social" src="img/twitter.svg" width="20" valign="bottom"></a>
    </li>
    <li><a href="#writers">JE SIGNE</a></li>
  </menu>

  <menu class="right">
    <li>
      <a href="https://www.facebook.com/EuropeEnMarche/" target="_blank"><img class="social" src="img/facebook.svg" width="20" valign="bottom"></a>
    </li>
    <li><a href="http://bit.ly/eem_don" target="_blank">JE DONNE</a></li>
  </menu>
</header>
  
<div id="main">
  <section id="banner">
    
    <h2>
      Ensemble, relançons la construction européenne...<br>
      Ayons le courage de dire et l’énergie de faire !
    </h2>
    <img src="img/contract.svg" width=128>
    <h3><span>Vous êtes déjà <em>123</em> à avoir signé cet appel citoyen !</span></h3>
    <button onclick="Signature.show();">J'AJOUTE MA SIGNATURE À LA TRIBUNE</button>
  </section>

  <section id="text">
    <menu id="lang">
      <li class="fr" onclick="Text.changeLanguage('fr');"></li>
      <li class="en" onclick="Text.changeLanguage('en');"></li>
      <li class="es" onclick="Text.changeLanguage('es');"></li>
      <li class="de" onclick="Text.changeLanguage('de');"></li><!--
      <li class="it" onclick="Text.changeLanguage('it');"></li>-->
    </menu>
    <div class="version">
      <button class="short selected" onclick="Text.shortVersion();">version courte</button><!--
      --><button class="full" onclick="Text.fullVersion();">version complète</button>
    </div>
    <div class="container"></div>
  </section>
  
  <section id="writers" class="sticky">
    <div class="container"></div>
    <button onclick="Signature.show();">J'AJOUTE MA SIGNATURE À LA TRIBUNE</button>
  </section>

  <section id="sponsors">
    <h3>Ils nous soutiennent
      <small>(échantillon aléatoire parmi nos grands témoins)</small>
    </h3>
    <div class="container"></div>
  </section>

  <section id="signatures">
    <h3>
      Vos soutiens citoyens<br>
      <small>(dernières signatures citoyennes)</small>
    </h3>
    <div class="signer">
      <div class="picture" style="background-image: url(/img/EM.png)"></div>
      <div class="name"><b>Emmanuel MACRON</b></div>
    </div>
    <div class="container"></div>
    <button class="grey" onclick="moreSignatures()">VOIR PLUS DE SIGNATURES</button>
  </section>

  <footer>
    <div id="contact" style="display: block">
      <h3>Contacter les fondateurs</h3>
    </div>

    <div id="groups">
      <img src="./img/logo_em.svg" width=100 style="float: left">
      <img src="./img/logo_eam.svg" width=100 style="float: right">
      
      <span id="copyright">
        &copy;2017, <i>l'Europe en Marche</i> all rights reserved, created by <a href="http://www.twitter.com/francoischazal">François Chazal</a>
      </span>
    </div>
  </footer>
</div>

<div id="signature" onclick="Signature.quit();">
  <div class="container">
    <canvas></canvas>
    
    <div id="quit" onclick="Signature.quit();">FERMER</div>

    <div id="forms" class="">
      <div class="container">
      <form id="send" onsubmit="return false;">
        <div class="preview"></div>
        <button type="button" class="grey small" onclick="Forms.quit();">Je souhaite recommencer</button>

        <input id="firstname" type="text" placeholder="prénom / firstname">
        <input id="lastname" type="text" placeholder="nom / lastname">
        
        <select id="country">
          <option value="" disabled hidden selected>pays / country</option>
          <option value="--">Hors UE / Out of EU</option>
          <option value="AU">Austria</option>
          <option value="BE">Belgium</option>
          <option value="BU">Bulgaria</option>
          <option value="CR">Croatia</option>
          <option value="CY">Cyprus</option>
          <option value="CZ">Czech Republic</option>
          <option value="DN">Denmark</option>
          <option value="ES">Estonia</option>
          <option value="FN">Finland</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="GR">Greece</option>
          <option value="HU">Hungary</option>
          <option value="IR">Ireland</option>
          <option value="IT">Italy</option>
          <option value="LA">Latvia</option>
          <option value="LI">Lithuania</option>
          <option value="LU">Luxembourg</option>
          <option value="MA">Malta</option>
          <option value="NL">Netherlands</option>
          <option value="PL">Poland</option>
          <option value="PO">Portugal</option>
          <option value="RO">Romania</option>
          <option value="SL">Slovakia</option>
          <option value="SO">Slovenia</option>
          <option value="ES">Spain</option>
          <option value="SW">Sweden</option>
          <option value="UK">United Kingdom</option>
        </select>
        
        <button onclick="Forms.validateSend();">Je valide ma signature</button>
      </form>

      <form id="share" onsubmit="return false;">
        <h2>
          <i>MERCI POUR VOTRE SIGNATURE !</i>
        </h2>

        <div>
          <p>Souhaitez-vous être informé de la suite du mouvement ?</p>
          <button class="" onclick="Forms.showSubscribe();">Oui, je m'inscris</button>
          <button class="grey" onclick="window.location.reload();">Non, merci</button>
        </div>

        <p>
          <a class="give" href="http://bit.ly/eem_don" target="_blank">JE SOUTIENS <i>EN MARCHE</i> PAR UN DON !</a>
        </p>

        <div>
          <button class="share twitter" onclick="_Forms.shareTwitter();">JE PARTAGE SUR <i>TWITTER</i></button>

          <button class="share facebook" onclick="_Forms.shareFacebook();">JE PARTAGE SUR <i>FACEBOOK</i></button>
        </div>
      </form>

      <form id="subscribe" onsubmit="return false;">
        <input id="email" type="email" placeholder="courriel / e-mail">
        <input id="job" type="text" placeholder="profession / job">
        <input id="city" type="text" placeholder="ville / city">
        <input id="other" type="text" placeholder="déjà en marche ? / already en marche ?">
        
        <button onclick="Forms.validateSubscribe();">Je souscris à la newsletter</button>
        <!--
        <a href="https://groups.google.com/forum/#!forum/europe-en-marche/join">Je souscris à la newsletter</a>
        -->
      </form>
      </div>
      <div class="loading"></div>
    </div>
  </div>
</div>

<div id="cookies">
  Ce site utilise des cookies pour améliorer votre navigation <button onclick="Cookies.accept();">OK</button>
</div>

</body>

<script src="js/signature_pad.js"></script>
<script src="js/signature.js"></script>
<script src="js/cookies.js"></script>
<script src="js/server.js"></script>
<script src="js/forms.js"></script>
<script src="js/text.js"></script>

<!-- Google Analytics -->
<script>
  window.ga_key = '<?php
    $key = pack('H*', '243F6A8885A308D313198A2E03707344');
    
    $plaintext = strval(71*rand(1,1000));

    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,
                                 $plaintext, MCRYPT_MODE_CBC, $iv);
    $ciphertext = $iv . $ciphertext;
    $ciphertext_base64 = base64_encode($ciphertext);

    echo  $ciphertext_base64;
  ?>';

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93042348-1', 'auto');
  ga('send', 'pageview');
</script>
  
<script src="js/main.js"></script>
</html>