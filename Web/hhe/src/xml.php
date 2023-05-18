<?php
error_reporting(E_ERROR | E_PARSE);
libxml_disable_entity_loader (false);
$xmlfile = file_get_contents('php://input');
$dom = new DOMDocument();
$dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
$info = simplexml_import_dom($dom);
$name = $info->name;
$email = $info->email;
$comment = $info->comment;

echo "$email Thank you for your valuable feedback hhe";
?>