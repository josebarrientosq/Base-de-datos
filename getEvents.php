<?php
  

/*$data['eventos']=array(

	array(
        
          'title'=> 'All Day Event',
          'start'=> '2018-03-01',
        ),
	array(
        
          'title'=> 'All Day Event',
          'start'=> '2018-03-05',
        )


);
*/

session_start(); 
require('conector.php');
$con = new ConectorBD('localhost','root','');

$data['msg']= $con->initConexion('agendaphp');
if($data['msg']="OK"){
	//$consulta=$con->ejecutarQuery("SELECT titulo, start_date, allDay, end_date, end_hour, start_hour FROM eventos");$consulta=$con->ejecutarQuery("SELECT title, start_date +' '+start_hour as 'start' FROM eventos");
	$consulta=$con->ejecutarQuery("SELECT id,title, start_date as 'start' FROM eventos WHERE iduser=".$_SESSION['id']); //cargar los id para update y delete por id
	
	
}

$dbdata = array();

while ( $row = $consulta->fetch_assoc())  {
	$dbdata[]=$row;
  }

$data['eventos']=$dbdata;



$data['msg']="OK";
$con->cerrarConexion();

echo json_encode($data);

 ?>
