<?php 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Token");
	$auth = $_SERVER['HTTP_TOKEN'];
	if($auth == 'ZXN0ZSBlcyBlbCB0b2tlbiBkZSBhY2Nlc28uLi4=') {
		extract($_POST);
		extract(json_decode(file_get_contents('php://input'),true));
	}else {
		die("Acceso denegado.");
	}
?>