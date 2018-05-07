<?php
session_start();
require('conector.php');
$con = new ConectorBD('localhost','general','1234');
$passw=$_POST["password"];
$email=$_POST["username"];

$respuesta['conexion']= $con->initConexion('agendaphp');
if($respuesta['conexion']="OK"){
	$resul=$con->datosUsuario($email);
	while ($rows = $resul->fetch_array()) {
		 
		if(password_verify($passw,$rows["password"])) {
			$_SESSION['id'] = $rows["id"];
			$respuesta['acceso']='concedido';
	    	  
	 		//echo json_encode($php_response,JSON_FORCE_OBJECT);
		}
		echo json_encode($respuesta,JSON_FORCE_OBJECT);
	}

$con->cerrarConexion();

} 

 ?>
