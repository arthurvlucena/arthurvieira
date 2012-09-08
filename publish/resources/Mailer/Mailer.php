<?php
$destinatario = "arthurvmx5@gmail.com";

$json = @$_POST["json"];

$assunto = $json["headmsg"];
$corpo = $json["bodymsg"];
$corpo = $corpo."<br> RESPONDER: ".$json["namemsg"]." | ".$json["emailmsg"];

//para o envio em formato HTML
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: Contato <contato@paraibarecuperadora.com.br>' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();
/*
$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";
*/
if (mail($destinatario,$assunto,$corpo,$headers))
	echo "1";
else 
	echo "-1";

?>