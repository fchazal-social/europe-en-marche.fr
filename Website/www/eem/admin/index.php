<!doctype html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

	<title>l'Europe en Marche – ADMIN</title>
	<link rel="icon" href="favicon.png">
 
	<!-- Android Web App -->
	<meta name="viewport" content="width=device-width">
	<meta name="mobile-web-app-capable" content="yes">
	
	<link rel="icon" sizes="192x192" type="image/png" href="../favicon.png">
  
  <link rel="stylesheet" href="css/main.css" />

  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,200i,300,300i,400,400i,700,700i" rel="stylesheet">
</head>
 

<body>
<div id="sponsors">
  <div class="signer">
    <div id="picture" class="picture" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    <i>192x192 pixels JPEG file</i>
    <input id="firstname" class="name" type="text" placeholder="prénom" required>
    <input id="lastname" class="name" type="text" placeholder="nom" required>
    <input id="twitter" class="twitter" type="text" placeholder="twitter">
    <textarea id="role" class="role" required></textarea>
    
    <button onclick="sendSponsor();">ajouter</button>
  </div>
</div>
</body>
  
<script src="js/server.js"></script>

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
</script>
  
<script src="js/main.js"></script>
</html>
