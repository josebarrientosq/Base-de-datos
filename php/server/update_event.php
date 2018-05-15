<?php
  
require('conector.php');
$con = new ConectorBD('localhost','root','');

$data['msg']= $con->initConexion('agendaphp');
if($data['msg']="OK"){




$consulta=$con->ejecutarQuery("UPDATE eventos SET start_date='".$_POST['start_date']."',end_date='".$_POST['end_date']."',end_hour='".$_POST['end_hour']."',start_hour='".$_POST['start_hour']."' WHERE id=".$_POST['id'] );


}

$data['id']=$_POST['id'];

$con->cerrarConexion();
echo json_encode($data);

 ?>
