<?php	

function toSlug($string,$space="-") {
    if (function_exists('iconv')) {
        $string = @iconv('UTF-8', 'ASCII//TRANSLIT', $string);
    }
    $string = preg_replace("/[^a-zA-Z0-9 -]/", "", $string);
    $string = strtolower($string);
    $string = str_replace(" ", $space, $string);
    return $string;
}

function id() {
    return time();
}
function createFileContent($name) {
    $content = ["content" => []];
    file_put_contents(__DIR__."/json/content/".$name, json_encode($content));
}

function deleteFileContent($name) {
    unlink(__DIR__."/json/content/".$name);
}

function deleteFile($file) {
    unlink(__DIR__."/files/".$file);   
}


?>