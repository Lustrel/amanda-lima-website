<?php
/* **********************************
 * A very simple PHP file which sends 
 * a simple e-mail.
 * **********************************/

$name = $_GET['name'];
$email = $_GET['email'];
$message = $_GET['message'];
$to = 'contato@ptamanda.com.br';

$finalMessage = "
	Nome: $name
	E-mail: $email
	---
	$message
";

mail($to, 'Contato enviado pelo site', $finalMessage);