<?php
require_once('csscomb.php');
$csscomb = new csscomb();
/*$sort_type = is_file($argv[2]) ? file_get_contents($argv[2]) : $argv[2];*/
$input = $csscomb->csscomb($argv[1], false, null);
echo $input;
?>