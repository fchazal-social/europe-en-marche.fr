<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

function writeResponse($data, $status = 200) {
  $requestStatus = array(  
    200 => 'OK',
    404 => 'Not Found',   
    405 => 'Method Not Allowed',
    500 => 'Internal Server Error',
  );
  
  header("HTTP/1.1 " . $status . " " . $requestStatus[$status]);
  header('Content-Type: application/json');
  echo json_encode($data);
}

class API {
  static $root = "../data/vault";

  /* GET METHODS *****************************************/
  
  static function getText() {
    $contents = file_get_contents(self::$root . "/text.json");
    $data = json_decode($contents);

    writeResponse($data, 200);
  }

  static function getFounders() {
    $contents = file_get_contents(self::$root . "/founders.json");
    $data = json_decode($contents);

    writeResponse($data, 200);
  }

  static function getSponsors($limit=10) {
    $contents = file_get_contents(self::$root . "/sponsors.json");
    $data = json_decode($contents);
    
    shuffle($data);
    $final = array_slice($data, 0, $limit);
    
    writeResponse($final, 200);
  }

  static function getCounter() {
    $contents = file_get_contents(self::$root . "/counter.json");
    $json = json_decode($contents);
    
    writeResponse($json, 200);
  }

  static function getSignatures($from=0, $limit=10) {
    $contents = file_get_contents(self::$root . "/signatures.json");
    $data = json_decode($contents);
    
    $final = array_slice($data, $from, $limit);
    
    writeResponse($final, 200);
  }

  
  /* POST METHODS ****************************************/
  
  static function postSignature($content) {
    $json = json_decode($content);
    
    // CREATE FILE
    $name = strtolower($json->firstname)."_".strtolower($json->lastname)."_".$json->country;
    $filename = "/data/signatures/".$name."_".time().".svg";

    $data = $json->signature;
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    file_put_contents("..".$filename, $data);

    
    // CREATE PEOPLE
    $people = new stdClass();
    $people->firstname = $json->firstname;
    $people->lastname = $json->lastname;
    $people->country = $json->country;
    $people->signature = $filename;
    
    
    // UPDATE LISTING
    $filename = "../data/vault/signatures.json";
    $handle = fopen($filename, "r+");
    flock($handle, LOCK_EX);
    
    $contents = fread($handle, filesize($filename));
    $tmp = json_decode($contents);
    array_unshift($tmp, $people);
    fseek($handle, 0);
    $encoded = json_encode($tmp);
    if ($encoded != "null") {
      fwrite($handle, $encoded);
      ftruncate($handle, ftell($handle));
    }
    fclose($handle);
    
    
    // UPDATE COUNTER
    $filename = "../data/vault/counter.json";
    $handle = fopen($filename, "r+");
    flock($handle, LOCK_EX);
    
    $contents = fread($handle, filesize($filename));
    $tmp = json_decode($contents);
    $tmp->count++;
    fseek($handle, 0);
    $encoded = json_encode($tmp);
    if ($encoded != "null") {
      fwrite($handle, $encoded);
      ftruncate($handle, ftell($handle));
    }
    fclose($handle);
    
    writeResponse(json_encode($tmp), 200);
  }
  
  static function postSubscription($content) {
    $json = json_decode($content);
    
    // CREATE PEOPLE
    $people = new stdClass();
    $people->firstname = $json->firstname;
    $people->lastname = $json->lastname;
    $people->email = $json->email;
    $people->job = $json->job;
    $people->city = $json->city;
    $people->country = $json->country;
    $people->other = $json->other;

    
    // UPDATE LISTING
    $filename = "../data/vault/subscribers.json";
    $handle = fopen($filename, "r+");
    flock($handle, LOCK_EX);
    
    $contents = fread($handle, filesize($filename));
    $tmp = json_decode($contents);
    array_unshift($tmp, $people);
    fseek($handle, 0);
    $encoded = json_encode($tmp);
    if ($encoded != "null") {
      fwrite($handle, $encoded);
      ftruncate($handle, ftell($handle));
    }
    fclose($handle);    
    
    writeResponse(null, 200);
  }
  
  
  static function postSponsor($content) {
    $json = json_decode($content);
    
    // CREATE FILE
    $name = strtolower($json->firstname)."_".strtolower($json->lastname);
    $filename = "/data/sponsors/".$name.".jpg";

    $data = $json->picture;
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    file_put_contents("..".$filename, $data);

    
    // CREATE PEOPLE
    $people = new stdClass();
    $people->firstname = $json->firstname;
    $people->lastname = $json->lastname;
    $people->role = $json->role;
    $people->twitter = $json->twitter;
    $people->picture = $filename;
    
    
    // UPDATE LISTING
    $filename = "../data/vault/sponsors.json";
    $handle = fopen($filename, "r+");
    flock($handle, LOCK_EX);
    
    $contents = fread($handle, filesize($filename));
    $tmp = json_decode($contents);
    array_unshift($tmp, $people);
    fseek($handle, 0);
    $encoded = json_encode($tmp, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded != "null") {
      fwrite($handle, $encoded);
      ftruncate($handle, ftell($handle));
    }
    fclose($handle);
    
    writeResponse(json_encode($tmp), 200);
  }
  
  /* PARSE REQUEST ***************************************/
  
  static function parseGET($query) {
    switch($query)
    {
      case "text":
        self::getText();
        break;
      case "founders":
        self::getFounders();
        break;
      case "sponsors":
        self::getSponsors();
        break;
      case "counter":
        self::getCounter();
        break;
      case "signatures":
        self::getSignatures($_GET["from"]);
        break;

      default:
        echo writeResponse(null, 405);
    }
  }

  static function parsePOST($query, $content) {
    switch($query)
    {
      case "signature":
        self::postSignature($content);
        break;
      case "subscription":
        self::postSubscription($content);
        break;
      case "sponsor":
        self::postSponsor($content);
        break;
        
      default:
        echo writeResponse(null, 405);
    }
  }
}


function parseREQUEST() {
  switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
      API::parseGET($_GET["q"]);
      break;

    case 'POST':
      API::parsePOST($_GET["q"],  file_get_contents("php://input"));
      break;

    default:
      echo writeResponse(null, 405);
  }
}


// BEGIN <<<
if(!function_exists('getallheaders')) {
  function getallheaders() {
    foreach($_SERVER as $name => $value)
      if(substr($name, 0, 5) == 'HTTP_') {
        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
      }

    return $headers;
  }
}
// END >>>>>


$headers = getallheaders();
if (array_key_exists('Client-Id', $headers)) {
  $key = pack('H*', '243F6A8885A308D313198A2E03707344');
  $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    
  $value = $headers['Client-Id'];
  
  $ciphertext_dec = base64_decode($value);
  $iv_dec = substr($ciphertext_dec, 0, $iv_size);
  $ciphertext_dec = substr($ciphertext_dec, $iv_size);
  $plaintext = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key,
                                  $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
  
  $id = intval($plaintext);
  if ($id != 0 && $id % 71 == 0)
    parseREQUEST();
  else echo writeResponse(null, 500);
} else echo writeResponse(null, 500);

?>