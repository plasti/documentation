<?php 

include 'auth.php';

if($action == 'get_config') {
	$json = file_get_contents('json/config.json');
	echo $json;
}
if($action == 'get_menu') {
	$json = file_get_contents('json/menu.json');
	echo $json;
}
if($action == 'set_config') {
	$json = file_get_contents('json/config.json');
	$json = (object) json_decode($json);
	$config =  (object) $json->config;
	$config->title = $title;
	$config->description = $description;
	$config->primario = $primario;
	$config->secundario = $secundario;
	$config->terciario = $terciario;
	$config->foro = $foro;
	$config->login = $login;
	$config->facebook = $facebook;
	$config->instagram = $instagram;
	$config->linkedin = $linkedin;
	$config->whatsapp = $whatsapp;
	$config->youtube = $youtube;
	$config->email = $email;
	$config->phone = $phone;
	$config->user = base64_encode($user);
	$config->password = base64_encode($password);
	if($logo != "") {
		$file = explode('base64,', $logo);
		$data = base64_decode($file[1]);
		$name = 'logo_'.time().'.png';
		file_put_contents(__DIR__."/files/".$name, $data);
		$config->logo = $name;
	}
	if($favicon != "") {
		$file2 = explode('base64,', $favicon);
		$data2 = base64_decode($file2[1]);
		$name2 = 'favicon_'.time().'.png';
		file_put_contents(__DIR__."/files/".$name2, $data2);
		$config->favicon = $name2;
	}
	$json->config = $config;
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	$f = fopen('json/config.json', 'w');
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true]);
}
if($action == 'upload') {
	if($file != "") {
		$file = explode('base64,', $file);
		$data = base64_decode($file[1]);
		file_put_contents(__DIR__."/files/".$name, $data);
		echo json_encode(['status' => true]);
	}
}
if($action == 'auth') {
	$json = file_get_contents('json/config.json');
	$json = (object) json_decode($json);
	$config =  (object) $json->config;
	if($user == base64_decode($config->user) && $password == base64_decode($config->password)) {
		echo json_encode(['status' => true]);
	}else {
		echo json_encode(['status' => false, 'data' => 'Usuario o contraseña incorrecta.']);
	}
}



?>