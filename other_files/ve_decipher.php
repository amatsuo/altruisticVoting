<?php
//coming from http://stackoverflow.com/questions/29509934/encrypt-with-cryptojs-and-decrypt-with-php

//Here we have the key and iv which we know, because we have just chosen them on the JS,
//the pack acts just like the parse Hex from JS

$key = pack("H*", "0123456789abcdef0123456789abcdef");
$iv =  pack("H*", "abcdef9876543210abcdef9876543210");

//Now we receive the encrypted from the post, we should decode it from base64,
$str0 = $_GET["encrypted"];
// echo $str0;
$encrypted = base64_decode($str0);
// //echo $encrypted, " aa ";
// $str = "47Xd6dLaHaC5oHaBUJqsBQ==";
// echo $str;
// $encrypted = base64_decode($str);
//echo $encrypted, " bb ";

$shown = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $encrypted, MCRYPT_MODE_CBC, $iv);

#echo $shown;
#echo "M2a=20;M2b=30";

#echo $shown;
$variables = explode(',', $shown);


$writer = new XMLWriter();
$writer->openURI('php://output');
$writer->startDocument('1.0','UTF-8');
$writer->setIndent(4);
$writer->startElement("outcomes");
foreach($variables as $item) {
  #echo $item;//
  $var_nval = explode("=", $item);
  $writer->writeElement($var_nval[0], $var_nval[1]);
}
$writer->endElement();
$writer->endDocument();
$writer->flush();

//Although the decrypted is shown, there may be needed to trim and str_replace some \r \n \x06 \x05, if there is not a better "trim" way to do it though
?>
