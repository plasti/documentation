<?php 

include 'auth.php';

if($action == 'get_config') {
	$json = file_get_contents('json/config.json');
	echo $json;
}
?>