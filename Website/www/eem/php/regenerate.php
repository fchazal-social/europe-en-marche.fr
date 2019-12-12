<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function regenerateSignatures() {
  $signature_file = "../data/vault/signatures.json";
  $handle = fopen($signature_file, "r+");
  flock($handle, LOCK_EX);

  $files = scandir("../data/signatures");

  $pattern = '/^([^_]+)_([^_]+)(.*)\.svg$/';
  $tmp = [];
  
  for ($i = 0; $i < count($files); $i++) {
    $filename = $files[$i];

    preg_match($pattern, $filename, $matches);
    if (count($matches) == 4) {
      $pattern2 = '/^(_[\-A-Z][\-A-Z]){0,1}(_[0-9]+){0,1}$/';
      preg_match($pattern2, $matches[3], $matches2);
      
      $country = "00";
      if (count($matches2) == 3 && $matches2[1] != "") {
        $country = substr($matches2[1], 1);
      }
      
      // CREATE PEOPLE
      $people = new stdClass();
      $people->firstname = ucfirst(trim($matches[1]));
      $people->lastname = strtoupper(trim($matches[2]));
      $people->country = $country;
      $people->signature = "/data/signatures/".$filename;
      
      array_unshift($tmp, $people);
    }
    
  }

  shuffle($tmp);
  print_r($tmp);

  fseek($handle, 0);
  $encoded = json_encode($tmp);
  if ($encoded != null)
    fwrite($handle, $encoded);
  ftruncate($handle, ftell($handle));
  fclose($handle);
}

regenerateSignatures();
?>