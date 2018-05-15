<?php
session_start(); 
require('conector.php');
$con = new ConectorBD('localhost','root','');
//$test=1;

$data['msg']= $con->initConexion('agendaphp');
if($data['msg']="OK"){
	
	//$con->ejecutarQuery("INSERT INTO eventos (id,titulo,start_date,allDay,end_date,end_hour,start_hour) VALUES ('','demo2','2018-05-13','false','','','')");//ok

//$con->ejecutarQuery("INSERT INTO eventos (id,title,start_date,allDay,end_date,end_hour,start_hour,iduser) VALUES ('','".$_POST['titulo']."','".$_POST['start_date']."','".$_POST['allDay']."','".$_POST['end_date']."','".$_POST['end_hour']."','".$_POST['start_hour']."','".$test."')");

$con->ejecutarQuery("INSERT INTO eventos (id,title,start_date,allDay,end_date,end_hour,start_hour,iduser) VALUES ('','".$_POST['titulo']."','".$_POST['start_date']."','".$_POST['allDay']."','".$_POST['end_date']."','".$_POST['end_hour']."','".$_POST['start_hour']."','".$_SESSION['id']."')" ); //parcialmente ok


$id=$con->ejecutarQuery("SELECT id FROM eventos ORDER BY id DESC LIMIT 1");
}

$data['id']=$id->fetch_all();

$con->cerrarConexion();

echo json_encode($data);

 ?>
