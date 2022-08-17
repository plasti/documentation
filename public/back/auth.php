<?php 
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	extract(json_decode(file_get_contents('php://input'),true));
	if(isset($token)) {
		if($token != 'ZXN0ZSBlcyBlbCB0b2tlbiBkZSBhY2Nlc28uLi4=') {
			die("Acceso denegado.");
		}
	}else {
		die("Acceso denegado.");
	}
?>