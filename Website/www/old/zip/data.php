<?php
  $directory = "../data";
  $filename = "./data/".date("Ymd_his").".zip";
  $command = "zip -r $filename $directory";
  exec($command);
?>