<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$UNo = $db->escape_string($_POST['UNo']);
	$UName = $db->escape_string($_POST['UName']);
	$UPsw = $db->escape_string($_POST['UPsw']);
	$UEmail = $db->escape_string($_POST['UEmail']);

	
	$sql = "UPDATE usertable SET UName = '$UName',UPsw = '$UPsw',UEmail = '$UEmail' WHERE UNo = '$UNo' ";
	$json_encode  = $tools->UpdataTool($sql);

	$tools->CloseTool();
?>