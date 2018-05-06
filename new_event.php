<?php
  
require('conector.php');
$con = new ConectorBD('localhost','root','');

$data['msg']= $con->initConexion('agendaphp');
if($data['msg']="OK"){
	
	//$con->ejecutarQuery("INSERT INTO eventos (id,titulo,start_date,allDay,end_date,end_hour,start_hour) VALUES ('','demo2','2018-05-13','false','','','')");//ok

$con->ejecutarQuery("INSERT INTO eventos (id,title,start_date,allDay,end_date,end_hour,start_hour) VALUES ('','".$_POST['titulo']."','".$_POST['start_date']."','".$_POST['allDay']."','".$_POST['end_date']."','".$_POST['end_hour']."','".$_POST['start_hour']."')" );

$consulta=$con->ejecutarQuery("SELECT title, start_date as 'start' FROM eventos");
}



$data['msg']="OK";

$dbdata = array();

while ( $row = $consulta->fetch_assoc())  {
	$dbdata[]=$row;
  }

$data['consulta']=$dbdata;

$con->cerrarConexion();

echo json_encode($data);

 ?>
