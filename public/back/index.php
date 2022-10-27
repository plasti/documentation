<?php 

include 'auth.php';
include 'functions.php';

if($action == 'get_config') {
	$json = file_get_contents('json/config.json');
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
	$config->code_login = base64_encode($code_login);
	$config->facebook = $facebook;
	$config->instagram = $instagram;
	$config->linkedin = $linkedin;
	$config->whatsapp = $whatsapp;
	$config->youtube = $youtube;
	$config->email = $email;
	$config->web = $web;
	$config->user = base64_encode($user);
	$config->password = base64_encode($password);
	if($logo != "") {
		$file = explode('base64,', $logo);
		$data = base64_decode($file[1]);
		$name = 'logo_'.time().'.png';
		file_put_contents(__DIR__."/files/".$name, $data);
		if($config->logo != null && $config->logo != '') {
			unlink(__DIR__."/files/".$config->logo);
		}
		$config->logo = $name;
	}
	if($favicon != "") {
		$file2 = explode('base64,', $favicon);
		$data2 = base64_decode($file2[1]);
		$name2 = 'favicon_'.time().'.png';
		file_put_contents(__DIR__."/files/".$name2, $data2);
		if($config->favicon != null && $config->favicon != '') {
			unlink(__DIR__."/files/".$config->favicon);
		}
		$config->favicon = $name2;
	}
	$json->config = $config;
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	$f = fopen('json/config.json', 'w');
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true]);
}
if($action == 'get_menu') {
	$json = file_get_contents('json/menu.json');
	echo $json;
}
if($action == 'set_item_menu') {
	$json = json_decode(file_get_contents("json/menu.json", true));
	$menu = $json->menu;
	if($type == 'subitem') {
		$i = 0;
		$data = (object) ["id" => id(), "title" => $title, "content" => toSlug($title), 'keywords' => $title.', '.toSlug($title)];
		createFileContent($data->id.'_'.$data->content.'.json');
		foreach($menu as $item) {
			if($item->id == $id) { $menu[$i]->items[count($menu[$i]->items)] = $data; }
			$i++;
		}
	}
	if($type == 'desplegable') {
		$data = (object) ["id" => id(), "title" => $title, "content" => toSlug($title), "type" => "details", "items" => []];
		$menu[count($menu)] = $data;
	}
	if($type == 'item') {
		$data = (object) ["id" => id(), "title" => $title, "type" => "simple", "content" => toSlug($title), 'keywords' => $title.', '.toSlug($title)];
		createFileContent($data->id.'_'.$data->content.'.json');
		$menu[count($menu)] = $data;
	}
	$json->menu = $menu;
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	$f = fopen('json/menu.json', 'w');
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true, 'data' => $data]);
}
if($action == 'delete_item_menu') {
	$json = json_decode(file_get_contents("json/menu.json", true));
	$menu = $json->menu;
	if($type == 'subitem') {
		foreach($menu as $item) {
			if($item->id == $id_parent) { 
				$menu[$i]->items = array_filter($menu[$i]->items, function ($subitem) use($id)
				{	
					if($subitem->id == $id) {
						deleteFileContent($id.'_'.$subitem->content.'.json');
					}
					return $subitem->id != $id;
				});
				$menu[$i]->items = array_values($menu[$i]->items);
			}
			$i++;
		}
	}
	if($type == 'desplegable') {
		foreach($menu as $item) {
			if($item->id == $id) {
				foreach($item->items as $subitem) {
					deleteFileContent($subitem->id.'_'.$subitem->content.'.json');
				}
			}
		}
		$menu = array_filter($menu, function ($item) use ($id)
		{
			return $item->id != $id;
		});
		$menu = array_values($menu);
	}
	if($type == 'item') {
		$menu = array_filter($menu, function ($item) use ($id)
		{
			if($item->id == $id) {
				deleteFileContent($id.'_'.$item->content.'.json');
			}
			return $item->id != $id;
		});
		$menu = array_values($menu);
	}
	$json->menu = $menu;
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	$f = fopen('json/menu.json', 'w');
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true]);
}
if($action == 'upload') {
	if($file != "") {
		$file = explode('base64,', $file);
		$data = base64_decode($file[1]);
		$name = time().'_'.$name;
		file_put_contents(__DIR__."/files/".$name, $data);
		echo json_encode(['status' => true, 'data' => $name]);
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
if($action == 'get_content') {
	$json = file_get_contents('json/content/'.$file);
	echo $json;
}
if($action == 'set_content') {
	$f = fopen('json/content/'.$file, 'w');
	$json = (object) ["content" => $content];
	if(count($files_delete) > 0) {
		foreach($files_delete as $fil) {
			deleteFile($fil);
		}
	}
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true]);
}
if($action == 'set_keywords') {
	$json = json_decode(file_get_contents("json/menu.json", true));
	$menu = $json->menu;
	if($type == 'item') {
		foreach($menu as $item) {
			if($item->id == $id) {
				$item->keywords = $keywords;
			}
		}
	}
	if($type == 'subitem') {
		foreach($menu as $item) {
			if($item->id == $id) {
				$i = 0;
				foreach($item->items as $subitem) {
					if($subitem->id == $id_subitem) {
						$item->items[$i]->keywords = $keywords;
					}
					$i++;
				}
			}
		}	
	}
	$json->menu = $menu;
	$json = json_encode($json, JSON_UNESCAPED_UNICODE);
	$f = fopen('json/menu.json', 'w');
	fwrite($f, $json);
	fclose($f);
	echo json_encode(['status' => true, 'data' => 'Ok']);
}
if($action == 'send_mail') {
	$json = file_get_contents('json/config.json');
	$json = json_decode($json);
	$config = $json->config;

	// Armar correo
    // ------------
    $html = 'Titulo: '.$config->title.' - Nuevo contacto \n';
    $html .= 'Asunto:'.$subject.'\n';
	$html .= 'Nombre: '.$name.'\n';
	$html .= 'Teléfono: '.$phone.'\n';
	$html .= 'Mensaje: '.$message.'\n';
	$html .= 'Por favor no responder ni reenviar, este es un mensaje generado automaticamente.';
	mail($config->email, $config->title.' - Nuevo contacto', $html);
	echo json_encode(['status' => true]);
}
if($action == 'download-from-app') {
	echo "Ok";
}
?>