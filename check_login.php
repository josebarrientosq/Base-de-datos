<?php
require('conector.php');
$con = new ConectorBD('localhost','general','1234');

$respuesta['conexion']= $con->initConexion('agendaphp');
if($respuesta['conexion']="OK"){
	
$consulta_usuario=$con->ejecutarQuery("SELECT * FROM usuarios where username=".$_POST['username']." AND password=".$_POST['password']);
//	$consulta_usuario = $con->consultar(['usuarios'],['username'] , "WHERE username=".$_POST['username']."AND password=".$_POST['password']);

//	if ($consulta_usuario!= null) 
 //    $respuesta['acceso'] = 'concedido';
//    }else $respuesta['acceso'] = 'rechazado';
} 

echo json_encode($respuesta);

$con->cerrarConexion();


 ?>
