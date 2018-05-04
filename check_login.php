<?php
require('conector.php');
$con = new ConectorBD('localhost','general','1234');

$respuesta['conexion']= $con->initConexion('agendaphp');
if($respuesta['conexion']="OK"){


$consulta_usuario=$con->ejecutarQuery("SELECT * FROM usuarios WHERE username='".$_POST['username']."' AND password ='".$_POST['password']."'");
if($consulta_usuario->num_rows>0){
	$respuesta['acceso'] = 'concedido';
    }else $respuesta['acceso'] = 'rechazado';

$respuesta["consulta"]=$consulta_usuario->fetch_array();
$respuesta['a']=$_POST['username'];
$respuesta['b']=$_POST['password'];

} 

echo json_encode($respuesta);

$con->cerrarConexion();


 ?>
