<?php
  $directory = "../data/vault";
  $filename = "./vault/".date("Ymd_his").".zip";
  $command = "zip -r $filename $directory";
  exec($command);
?>